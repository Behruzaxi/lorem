const showModalBtn = document.querySelector('.show-nodal');
const bottomSheet = document.querySelector('.bottom-sheet');
const showOverlay = bottomSheet.querySelector('.sheet-overlay');
const sheetContent = bottomSheet.querySelector('.content');
const dragIcon = bottomSheet.querySelector('.drag-icon');

// bu yerda 1-dan, 5-qatorgacha bolgan codelar index.htmlda yozigan divlarimiz va buttonlarimizni caqirib oldik
// 3-dan 5- qatordagi kodlar bottomsheet.quaryselector qlganiimiz sababi sheet-overlay, content, drag-icon klaslarimiz bottomsheet nomli divni ichida joylashgan va ularga hodsa ulaganmz


let isDragging = false, startY, startHeight;
// bu yerda let ozgaruvchsiini yaratdik va " dragging -- sudrab borish " false ga teng bo'lsa y o'qiga balandlikka 

const showBottomSheet = () => {
    bottomSheet.classList.add("show");
    document.body.style.overflowY = "hidden";
    updateSheetHeight(50);
};


const hideBottomSheet = () => {
    bottomSheet.classList.remove("show")
    document.body.style.overflowY = "auto";
};


const updateSheetHeight = (height) => {
    sheetContent.style.height = `$height}vh`
   // varaq tarkibining balandligini yangilaydi, agar balandlik 100 ga teng bo'lsa, to'liq ekran sinfini pastki Sheetga almashtiradi
    bottomSheet.classList.toggle("fullscreen", height === 100);
}

//Boshlang‘ich tortish o‘rnini va varaqTarkib balandligini o‘rnatadi 

const dragStart = () => {
    isDragging = true
    startY = e.pageY || e.touches?.[0].pageY;
    startHeight = parseInt(sheetContent.style.height);
    bottomSheet.classList.add("dragging")
    
}


//Varaq mazmuni uchun yangi balandlikni hisoblab chiqadi va updateSheetHeight funksiyasini chaqiradi

const dragging = (e) => {
    if(!isDragging) return;
    const delta = startY - (e.pageY || e.touches?.[0].pageY);
    const newHeight = startHeight + delta / window.innerHeight * 100;
    updateSheetHeight(newHeight)
    sheetContent.style.height = `${e.pageY}vh`
}


// Varaq tarkibining joriy balandligi asosida yashirish, toʻliq ekranga oʻrnatish yoki standart balandlikka oʻrnatishni aniqlaydi.

const dragStop = () => {
    isDragging = false;
    bottomSheet.classList.remove("draggging");
    const sheetHeight = parseInt(sheetContent.style.height);
    sheetHeight < 25 ? hideBottomSheet() : sheetHeight > 75 ? updateSheetHeight(100) : updateSheetHeight(50)
}


document.addEventListener("mouseup", dragStop)
dragIcon.addEventListener("mousedown", dragStart)
document.addEventListener("mousemove", dragging)


document.addEventListener("touchend", dragStop)
dragIcon.addEventListener("touchstart", dragStart)
document.addEventListener("touchmove", dragging)

showModalBtn= addEventListener('click', showBottomSheet)
showOverlay.addEventListener("click", hideBottomSheet);
