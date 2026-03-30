document.addEventListener('DOMContentLoaded', () => {
    // เช็คก่อนเลยว่าเป็น PC หรือไม่ (ถ้าเป็นมือถือ/ไอแพด จะไม่รันโค้ดเสียงต่อ)
    const isPC = !window.matchMedia("(pointer: coarse)").matches;
    if (!isPC) return;

    let audioContext;
    let soundBuffer;
    let lastPlayTime = 0; 

    // 1. โหลดเสียงเตรียมไว้
    const loadSound = async () => {
        try {
            const response = await fetch('pop.mp3');
            const arrayBuffer = await response.arrayBuffer();
            return arrayBuffer;
        } catch (e) {
            console.log("โหลดไฟล์เสียงไม่เข้า:", e);
        }
    };

    const rawAudioData = loadSound();

    // 2. ฟังก์ชันเล่นเสียง (เน้นรัวสำหรับเมาส์)
    const playSound = async () => {
        const now = performance.now();
        // กันบั๊กนิดเดียว 10ms (รัวได้แบบ Machine Gun)
        if (now - lastPlayTime < 10) return; 
        lastPlayTime = now;

        if (!audioContext) {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }

        // สำหรับ PC ไม่ค่อยติดเรื่อง suspended แต่ใส่ไว้กันเหนียวครับ
        if (audioContext.state === 'suspended') {
            await audioContext.resume();
        }

        if (!soundBuffer) {
            const data = await rawAudioData;
            soundBuffer = await audioContext.decodeAudioData(data.slice(0));
        }

        const source = audioContext.createBufferSource();
        source.buffer = soundBuffer;
        const gainNode = audioContext.createGain();
        gainNode.gain.value = 0.2; // ความดัง 20%
        
        source.connect(gainNode);
        gainNode.connect(audioContext.destination);
        source.start(0);
    };

    // 3. ผูก Event เฉพาะ mouseenter เท่านั้น
    const cards = document.querySelectorAll('.members-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', playSound);
    });

    
    const arrow = document.getElementById('scroll-arrow');

    arrow.addEventListener('click', () => {
    // เลื่อนลงไปทีละนิด ทุกครั้งที่กด (เช่น ครั้งละ 400px)
    // หรือจะใช้ window.innerHeight * 0.5 เพื่อให้เลื่อนลงไปครึ่งจอทุกครั้งที่กดก็ได้ครับ
    window.scrollBy({
        top: 400, 
        behavior: 'smooth' 
    });
});

    // แถม: ทำให้ลูกศรหายไปเมื่อผู้ใช้เลื่อนลงมาเองแล้ว
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            arrow.classList.add('fade-out');
        } else {
            arrow.classList.remove('fade-out');
        }
    });
});