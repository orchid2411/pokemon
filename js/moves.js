async function atkType(type) {
    let TableMove = $(`#${type.toUpperCase()}>.table-move>.moves`)
    TableMove.empty()

    let tamType = await fetch(end_point_type.concat(`${type}`))
    let kqType = await tamType.json();
    // console.log(kqType.moves)

    let move_name = [];
    for (let i = 0; i < kqType.moves.length; i++) {
            move_name[i] =kqType.moves[i].name
    }
    move_name.sort();
    // console.log(move_name)
    let physical = $('#physical')
    let special = $('#special')
    let status = $('#status')

    for (let i = 0; i < move_name.length; i++) {
        // if (i < move_name.length-1) {
        //     physical[0].style.display = "none"; 
        //     special[0].style.display = "none";
        //     status[0].style.display = "none";
        // }
        // else {
        //     physical[0].style.display = "block"; 
        //     special[0].style.display = "block"; 
        //     status[0].style.display = "block"; 
        // }
        if (i < move_name.length-1) {
            physical[0].disabled = true;
            special[0].disabled = true;
            status[0].disabled = true;
        }
        else {
            physical[0].disabled = false;
            special[0].disabled = false;
            status[0].disabled = false;
        }

        let resp1 = await fetch(end_point_moves.concat(`${move_name[i]}`))
        let kqdetail = await resp1.json()

        let power = kqdetail.power;
        let accuracy = kqdetail.accuracy;
        let atktype = '';
        let pp = kqdetail.pp;

        if (kqdetail.power == null) power = '--'
        if (kqdetail.accuracy == null) accuracy = '--'
        if (kqdetail.pp == null) pp = '--'
        if (kqdetail.damage_class === null) {
            $(`#${type.toUpperCase()}>.table-move>.moves`).append(`
                <tr>
                    <td style="text-align: left; padding-left: 5px"><a id="${kqdetail.name}" onclick="getidMname('${kqdetail.name}')">${kqdetail.name.replace(/-/g,' ')}</a></td>
                    <td></td>
                    <td>${power}</td>
                    <td>${pp}</td>
                    <td>${accuracy}</td>
                </tr>
            `)
        }
        else {$(`#${type.toUpperCase()}>.table-move>.moves`).append(`
        <tr>
            <td style="text-align: left; padding-left: 5px"><a id="${kqdetail.name}" onclick="getidMname('${kqdetail.name}')">${kqdetail.name.replace(/-/g,' ')}</a></td>
            <td><img src="/images/move-${kqdetail.damage_class.name}.png" alt="" style="width: 20%"></td>
            <td>${power}</td>
            <td>${pp}</td>
            <td>${accuracy}</td>
        </tr>
        `)} 
    }
}
function cuong() {
    alert('cuong')
}

async function RenderMoveStatus(type, id) {
    // console.log(window.event.target.id)
    // let id = window.event.target.id;
    let TableMove = $(`#${type.toUpperCase()}>.table-move>.moves`)
    TableMove.empty()

    let tamType = await fetch(end_point_type.concat(`${type}`))
    let kqType = await tamType.json();
    // console.log(kqType.moves)

    let move_name = [];
    for (let i = 0; i < kqType.moves.length; i++) {
            move_name[i] =kqType.moves[i].name
    }
    move_name.sort();
    // console.log(move_name)
    // $(`.table-move>#physical`).style.pointerEvents = "none";
    let physical = $('#physical')
    let special = $('#special')
    let status = $('#status')
    // cuong[0].disabled = true;

    for (let i = 0; i < move_name.length; i++) {
        if (i < move_name.length-1) {
            physical[0].disabled = true;
            special[0].disabled = true;
            status[0].disabled = true;
        }
        else {
            physical[0].disabled = false;
            special[0].disabled = false;
            status[0].disabled = false;
        }

        let resp1 = await fetch(end_point_moves.concat(`${move_name[i]}`))
        let kqdetail = await resp1.json()

        let atktype = '';
        if (kqdetail.damage_class !== null) atktype = kqdetail.damage_class.name
        
        if (atktype === id) {
            let power = kqdetail.power;
            let accuracy = kqdetail.accuracy;
            
            let pp = kqdetail.pp;

            if (kqdetail.power == null) power = '--'
            if (kqdetail.accuracy == null) accuracy = '--'
            if (kqdetail.pp == null) pp = '--'
            $(`#${type.toUpperCase()}>.table-move>.moves`).append(`
            <tr>
                <td style="text-align: left; padding-left: 5px"><a id="${kqdetail.name}" onclick="getidMname('${kqdetail.name}')">${kqdetail.name.replace(/-/g,' ')}</a></td>
                <td><img src="/images/move-${atktype}.png" alt="" style="width: 20%"></td>
                <td>${power}</td>
                <td>${pp}</td>
                <td>${accuracy}</td>
            </tr>
            `)
        }  
    }
}

$(document).ready(() => {

    const end_point_type = 'https://pokeapi.co/api/v2/type/';

    /* TYPE */
    fetch(end_point_type)
        .then((resp) => resp.json())
        .then((data) => {
            const result_type = data.count - 1;
            for (let i = 1; i < result_type; i++) {
                fetch(end_point_type.concat(`${i}`))
                    .then((resp) => resp.json())
                    .then((data) => {
                        $('#atk').append(`
                        <div class="panel" id="${data.name.toUpperCase()}">
                            <table class="table-move">
                                <caption>
                                    <a class="btn btn-${data.name}">${data.name.toUpperCase()}</a>
                                    <button style="background-color: black; border: none; float: right;" id="physical" onclick="RenderMoveStatus('${data.name}', 'physical')">
                                        <img src="/images/move-physical.png" alt="">
                                    </button>
                                    <button style="background-color: black; border: none; float: right;" id="special" onclick="RenderMoveStatus('${data.name}', 'special')">
                                        <img src="/images/move-special.png" alt="" >
                                    </button>
                                    <button style="background-color: black; border: none; float: right;" id="status" onclick="RenderMoveStatus('${data.name}', 'status')">
                                        <img src="/images/move-status.png" alt="" >
                                    </button>
                                </caption>
                                <tbody>
                                    <tr>
                                        <th>Move</th>
                                        <th>Atk Type</th>
                                        <th>Power</th>
                                        <th>P.Point</th>
                                        <th>Accuracy</th>
                                    </tr>
                                </tbody>
                                <tbody class="moves"></tbody>
                            </table>
                        </div>
                        `)
                        let typemove = sessionStorage.getItem('typemove');
                        if (typemove !== null) {
                            let type1 = $(`#${typemove.toUpperCase()}`)
                            let accordion = document.querySelectorAll(`#${type1[0].id}`)
                            accordion[accordion.length-1].style.display = "block";
                        }
                        else {
                            if (data.name === "normal") {
                                let type1 = $(`#${data.name.toUpperCase()}`)
                                let accordion = document.querySelectorAll(`#${type1[0].id}`)
                                accordion[accordion.length-1].style.display = "block";
                            }
                        }
                        
                    })
            }
        })
        
    /* button type */
    fetch(end_point_type)
        .then((resp) => resp.json())
        .then(async (data) => {
            const result_type = data.count - 1;
            for (let i = 1; i < result_type; i++) {
                await fetch(end_point_type.concat(`${i}`))
                    .then((resp) => resp.json())
                    .then((data) => {
                        $('#atk>.tab-type').append(`
                            <button class="btn btn-${data.name} accordion" onclick="openatk('${data.name.toUpperCase()}')" id="${data.name.toUpperCase()}">${data.name.toUpperCase()}</button>
                        `)
                        let type1 = $(`#${data.name.toUpperCase()}`)
                        let tam = type1[0].id.toLowerCase()
                        atkType(tam);
                    })
            }
        })
})