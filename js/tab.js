function opengen(evt, gen) {
    let tabcontent = $('.tabcontent');
    for (let i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    let tablinks = $('.tablinks');
    for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active-dex", "");
    }
    let tam = $(`#${gen}`);
    tam[0].style.display = "block";
    evt.currentTarget.className += " active-dex";

    let more_1 = document.querySelector(`#${gen}`).querySelectorAll('#more-1');
    let more_2 = document.querySelector(`#${gen}`).querySelectorAll('#more-2');
    let more_btn = document.querySelector(`#${gen}`).querySelector('#more-btn');
    more_btn.style.display = "block";
    for (let i = 0; i < more_1.length; i++) {
        more_1[i].setAttribute("id", "more-0");
    }
    for (let i = 0; i < more_2.length; i++) {
        more_2[i].setAttribute("id", "more-0");
    }
    let more_0 = document.querySelector(`#${gen}`).querySelectorAll('#more-0');
    for (let i = 12; i < more_0.length; i++) {
        if (i < 24) 
            more_0[i].setAttribute("id", "more-1");
        if (i >= 24)
            more_0[i].setAttribute("id", "more-2");
    }
}

const acc = $(".accordion");
for (let i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
        const panel = this.nextElementSibling;
        if (panel.style.display === "block") {
            panel.style.display = "none";
        } else {
            panel.style.display = "block";
        }
    });
}

$("#defaultOpen").click();


function moreFunc(gen) {
    let more = document.querySelector(`#${gen}`).querySelectorAll('#more-1');
    let more1 = document.querySelector(`#${gen}`).querySelectorAll('#more-2');
    let more_btn = document.querySelector(`#${gen}`).querySelector('#more-btn');

    // console.log(more.length)
    // console.log(more1.length)
    // console.log(more_btn)

    for (let i = 0; i < more.length; i++) {
        more[i].setAttribute("id", "more-0");
        if (more1.length === 0) {
            more_btn.style.display = "none";
        }
        if (more1.length >= 8) {
            more1[i].setAttribute("id", "more-1");
        }
        if (more1.length < 8) 
            for (let j = 0; j < more1.length; j++)
                more1[j].setAttribute("id", "more-1");
    }
    
    // console.log(more1[1])
} 

