function opengen(evt, gen) {
    let panel = $(".panel")
    for (let i = 0; i < panel.length; i++) {
        panel[i].style.display = "none"
    }
    let tabcontent = $(`.tabcontent`);
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

function openatk(type) {
    let panel = $(".panel")
    for (let i = 0; i < panel.length; i++) {
        panel[i].style.display = "none"
    }
    let type1 = $(`#${type}`)
    let accordion = document.querySelectorAll(`#${type1[0].id}`)
    accordion[accordion.length-1].style.display = "block";
    let tam = type1[0].id.replace('-ATK', '').toLowerCase()
    console.log(tam)
    atkType(tam);
}

$("#defaultOpen").click();

const end_point_type = 'https://pokeapi.co/api/v2/type/';
const end_point_moves = 'https://pokeapi.co/api/v2/move/';
async function atkType(type) {
    let tamType = await fetch(end_point_type.concat(`${type}`))
    let kqType = await tamType.json();
    console.log(kqType.moves)

    let move_name = [];
    for (let i = 0; i < kqType.moves.length; i++) {
            move_name[i] =kqType.moves[i].name
    }
    move_name.sort();
    console.log(move_name)

    for (let i = 0; i < move_name.length; i++) {

        let resp1 = await fetch(end_point_moves.concat(`${move_name[i]}`))
        let kqdetail = await resp1.json()

        let power = kqdetail.power;
        let accuracy = kqdetail.accuracy;
        let atktype = '';

        if (kqdetail.power == null) power = '--'
        if (kqdetail.accuracy == null) accuracy = '--'
        if (kqdetail.damage_class === null) atktype = '--' 
        else atktype = kqdetail.damage_class.name;

        $(`#${type.toUpperCase()}-ATK>.table-move`).append(`
        <tr>
            <td style="text-align: left; padding-left: 5px">${kqdetail.name.replace('-',' ')}</td>
            <td>${atktype}</td>
            <td>${power}</td>
            <td>${kqdetail.pp}</td>
            <td>${accuracy}</td>
        </tr>
        `)
    }
}

function moreFunc(gen) {
    let more = document.querySelector(`#${gen}`).querySelectorAll('#more-1');
    let more1 = document.querySelector(`#${gen}`).querySelectorAll('#more-2');
    let more_btn = document.querySelector(`#${gen}`).querySelector('#more-btn');

    for (let i = 0; i < more.length; i++) {
        more[i].setAttribute("id", "more-0");
        if (more1.length === 0) {
            more_btn.style.display = "none";
        }
        if (more1.length >= 12) {
            more1[i].setAttribute("id", "more-1");
        }
        if (more1.length < 12) 
            for (let j = 0; j < more1.length; j++)
                more1[j].setAttribute("id", "more-1");
    }
} 

