// --- 1. เตรียม Element สำหรับ Pop-up วิธีใช้งาน (Ad/How to) ---
    const adModal = document.getElementById("adModal");
    const openHowToBtn = document.getElementById("howToBtn");
    const closeAdX = document.querySelector(".ad-close-x");
    const closeAdBtn = document.getElementById("closeAdBtn");

    // --- 2. เตรียม Element สำหรับ Pop-up สถานะ Login ---
    const statusModal = document.getElementById("statusModal");
    const statusIcon = document.getElementById("statusIcon");
    const statusTitle = document.getElementById("statusTitle");
    const statusMsg = document.getElementById("statusMsg");
    const statusBtn = document.getElementById("statusBtn");
    const loginBtn = document.getElementById("loginBtn");

    // --- 3. เตรียมไฟล์เสียง ---
    const successSound = document.getElementById("successSound");
    const errorSound = document.getElementById("errorSound");
    if (successSound) successSound.volume = 0.5; 
    if (errorSound) errorSound.volume = 0.3;

    let isSuccess = false; 

    // --- 4. ฟังก์ชันสำหรับ Pop-up วิธีใช้งาน (How to) ---
    function showHowTo() { adModal.style.display = "block"; }
    function hideHowTo() { adModal.style.display = "none"; }

    if (openHowToBtn) openHowToBtn.onclick = (e) => { e.preventDefault(); showHowTo(); };
    if (closeAdX) closeAdX.onclick = hideHowTo;
    if (closeAdBtn) closeAdBtn.onclick = hideHowTo;

    // เด้งอัตโนมัติเมื่อเข้าเว็บ (หรือรีเฟรช)
    window.addEventListener('loa', () => {
        setTimeout(showHowTo, 10); // หน่วงเวลา 1 วินาทีค่อยเด้ง
    });

    // --- 5. ฟังก์ชันหลัก: ตรวจสอบการ Login ---
    loginBtn.onclick = function() {
        const user = document.getElementById("email").value.trim();
        const pass = document.getElementById("password").value.trim();

        // ตรวจสอบเงื่อนไข
        if ((user === "ภูริภัทร" && pass === "28796") || (user === "ธนภัทร" && pass === "28790")) {
            // กรณี: สำเร็จ
            isSuccess = true;
            successSound.play(); // เล่นเสียง success.mp3
            
            
            statusModal.className = "status-overlay success-theme";
            statusIcon.innerHTML = "✅";
            statusTitle.innerText = "Login สำเร็จ!";
            statusMsg.innerText = `ยินดีต้อนรับคุณ ${user} กำลังพาคุณไปหน้าหลัก...`;
        } else {
            // กรณี: พลาด
            isSuccess = false;
            // errorSound.play(); // ถ้ามีไฟล์เสียงผิดก็เอาคอมเมนต์ออกได้ครับ
            
            statusModal.className = "status-overlay error-theme";
            statusIcon.innerHTML = "❌";
            statusTitle.innerText = "เข้าสู่ระบบไม่สำเร็จ";
            statusMsg.innerText = "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง โปรดลองใหม่";
        }
        
        statusModal.style.display = "block"; // แสดงผล Pop-up สถานะ
    };

    // --- 6. ปุ่มตกลงใน Pop-up สถานะ ---
    statusBtn.onclick = function() {
        if (isSuccess) {
            window.location.href = "home.html"; 
        } else {
            statusModal.style.display = "none";
        }
    };

    // --- 7. ปิด Pop-up เมื่อคลิกพื้นหลัง (รวมทั้งสองอัน) ---
    window.onclick = function(event) {
        if (event.target == adModal) hideHowTo();
        if (event.target == statusModal && !isSuccess) {
            statusModal.style.display = "none";
        }
    }






    // เปิดเพลงงงงงงงงงงงงงงงงงงงงงงงงงงงงงงงงงงงงงงงงงงงงงงงงงงงงงงงงงงงงงงงงงงง
// 1. โหลด YouTube API
// ดึง Element ต่างๆ มาเตรียมไว้
const audio = document.getElementById('main-audio-file');
const playerCard = document.getElementById('player-card');

// ฟังก์ชันเปิด/ปิดหน้าต่างควบคุม
function togglePlayerCard() {
    playerCard.classList.toggle('show');
}

// ฟังก์ชันสั่งเล่นเพลง
function playMusic() {
    audio.play().catch(error => {
        console.log("Browser blocked autoplay. Please click anywhere on the page first.");
        alert("กรุณาคลิกที่หน้าเว็บก่อน 1 ครั้งเพื่ออนุญาตให้เล่นเสียง");
    });
}

// ฟังก์ชันหยุดเพลง
function pauseMusic() {
    audio.pause();
}

// ฟังก์ชันปรับระดับเสียง (0.0 ถึง 1.0)
function adjustVolume(val) {
    audio.volume = val;
}

// แถม: ให้เพลงวนลูปอัตโนมัติ
audio.loop = true;