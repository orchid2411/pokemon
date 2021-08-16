$(document).ready(() => {

    function ktIDMore(i, more) {
        if (i <= more) return k = 0;
        if ((i > more) && (i <= more + 12)) return k = 1;
        if (i > more + 12) return k = 2;
    }

    async function RenderPKM(start, end, location) {
        for (let i = start; i < end; i++) {
            await fetch(end_point_pkm.concat(`${i}`))
                .then((resp) => resp.json())
                .then((data) => { 
                    k = ktIDMore(i, start + 11);
                    let tamid = data.id;
                    if (data.id < 10) {
                        tamid = `00${data.id}`
                    }
                    if ((data.id >= 10) && (data.id < 100)) {
                        tamid = `0${data.id}`
                    }
                    if (data.types.length === 1) {
                        if (data.abilities.length === 1) {
                            $(`#${location}>.container>.row`).append(`
                            <div class="col-lg-3 col-md-4 col-sm-6 col-6" id="more-${k}">
                                <div class="card-pkm">
                                    <img src="../images/list_pokemon_bg.png" alt="" class="back-card">
                                    <div class="card-item-data">
                                        <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${tamid}.png" alt="...">
                                        <div class="card-body d-flex flex-column">
                                            <span>#${tamid}</span>
                                            <span>${data.name.toUpperCase()}</span>
                                            <div class="d-flex justify-content-center">
                                                <a class="btn one-item btn-${data.types[0].type.name}">${data.types[0].type.name.toUpperCase()}</a>
                                            </div>
                                            <span>Abilities: <p>${data.abilities[0].ability.name}</p> </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            `)
                        }
                        else {
                            $(`#${location}>.container>.row`).append(`
                            <div class="col-lg-3 col-md-4 col-sm-6 col-6" id="more-${k}">
                                <div class="card-pkm">
                                    <img src="../images/list_pokemon_bg.png" alt="" class="back-card">
                                    <div class="card-item-data">
                                        <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${tamid}.png" alt="...">
                                        <div class="card-body d-flex flex-column">
                                            <span>#${tamid}</span>
                                            <span>${data.name.toUpperCase()}</span>
                                            <div class="d-flex justify-content-center">
                                                <a class="btn one-item btn-${data.types[0].type.name}">${data.types[0].type.name.toUpperCase()}</a>
                                            </div>
                                            <span>Abilities: <p>${data.abilities[0].ability.name} / ${data.abilities[1].ability.name}</p> </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            `)
                        }
                    }
                    else {
                        if (data.abilities.length === 1) {
                            $(`#${location}>.container>.row`).append(`
                            <div class="col-lg-3 col-md-4 col-sm-6 col-6" id="more-${k}">
                                <div class="card-pkm">
                                    <img src="../images/list_pokemon_bg.png" alt="" class="back-card">
                                    <div class="card-item-data">
                                        <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${tamid}.png" alt="...">
                                        <div class="card-body d-flex flex-column">
                                            <span>#${tamid}</span>
                                            <span>${data.name.toUpperCase()}</span>
                                            <div class="d-flex justify-content-around">
                                                <a class="btn two-item btn-${data.types[0].type.name}">${data.types[0].type.name.toUpperCase()}</a>
                                                <a class="btn two-item btn-${data.types[1].type.name}">${data.types[1].type.name.toUpperCase()}</a>
                                            </div>
                                            <span>Abilities: <p>${data.abilities[0].ability.name}</p> </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            `)
                        }
                        else {
                            $(`#${location}>.container>.row`).append(`
                            <div class="col-lg-3 col-md-4 col-sm-6 col-6" id="more-${k}">
                                <div class="card-pkm">
                                    <img src="../images/list_pokemon_bg.png" alt="" class="back-card">
                                    <div class="card-item-data">
                                        <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${tamid}.png" alt="...">
                                        <div class="card-body d-flex flex-column">
                                            <span>#${tamid}</span>
                                            <span>${data.name.toUpperCase()}</span>
                                            <div class="d-flex justify-content-around">
                                                <a class="btn two-item btn-${data.types[0].type.name}">${data.types[0].type.name.toUpperCase()}</a>
                                                <a class="btn two-item btn-${data.types[1].type.name}">${data.types[1].type.name.toUpperCase()}</a>
                                            </div>
                                            <span>Abilities: <p>${data.abilities[0].ability.name} / ${data.abilities[1].ability.name}</p> </span>
                                        </div>
                                    </div>
                                </div>
                            `)
                        }
                    }
                })
        }
    }

    /* COUNTRY */
    const end_point_gen = 'https://pokeapi.co/api/v2/generation/';
    fetch(end_point_gen)
        .then((resp) => resp.json())
        .then((data) => {
            const result_gen = data.count + 1;
            for (let i = 1; i < result_gen; i++) {
                fetch(end_point_gen.concat(`${i}`))
                    .then((resp) => resp.json())
                    .then((data) => {
                        $('.pkdex').append(`
                        <div id="${data.main_region.name.toUpperCase()}" class="tabcontent">
                            <div class="container">
                                <div class="row">
                                </div>
                                <button onclick="moreFunc('${data.main_region.name.toUpperCase()}')" id="more-btn">More <span class="down_arrow"></span></button>
                            </div>
                        </div>
                        `)
                    })
                }
        })
    /* button country */
    fetch(end_point_gen)
        .then((resp) => resp.json())
        .then(async (data) => {
            const result_gen = data.count +1;
            for (let i = 1; i < result_gen; i++) {
                await fetch(end_point_gen.concat(`${i}`))
                    .then((resp) => resp.json())
                    .then((data) => {
                        // console.log(data.main_region.name)
                        $('.tab-gen').append(`
                            <button class="tablinks" onclick="opengen(event, '${data.main_region.name.toUpperCase()}')"><a href="#top">${data.main_region.name.toUpperCase()}</a></button>
                        `)
                    })
                }
        })

    /* TYPE */
    const end_point_type = 'https://pokeapi.co/api/v2/type/';
    fetch(end_point_type)
        .then((resp) => resp.json())
        .then((data) => {
            const result_type = data.count - 1;
            for (let i = 1; i < result_type; i++) {
                fetch(end_point_type.concat(`${i}`))
                    .then((resp) => resp.json())
                    .then((data) => {
                        $('.pkdex').append(`
                        <div id="${data.name.toUpperCase()}" class="tabcontent">
                            <div class="container">
                                <div class="row">
                                </div>
                                <button onclick="moreFunc('${data.name.toUpperCase()}')" id="more-btn">More <span class="down_arrow"></span></button>
                            </div>
                        </div>
                        `)
                    })
            }
        })
    /* button type */
    fetch(end_point_type)
        .then((resp) => resp.json())
        .then((data) => {
            const result_type = data.count - 1;
            for (let i = 1; i < result_type; i++) {
                fetch(end_point_type.concat(`${i}`))
                    .then((resp) => resp.json())
                    .then((data) => {
                        $('.tab-type').append(`
                            <button class="btn btn-${data.name}" onclick="opengen(event, '${data.name.toUpperCase()}')">${data.name.toUpperCase()}</button>
                        `)
                    })
            }
        })

    const end_point_pkm = 'https://pokeapi.co/api/v2/pokemon/';
    /* ALL DEX */
    fetch(end_point_pkm)
    .then((resp) => resp.json())
    .then(async () => {
        await RenderPKM(1,899, 'ALL')
    })
    

    /* PKM KANTO */
    fetch(end_point_pkm)
        .then((resp) => resp.json())
        .then(async () => {
            await RenderPKM(1, 152, 'KANTO') 
        })

    /* PKM JOHTO */
    fetch(end_point_pkm)
        .then((resp) => resp.json())
        .then(async () => {
            await RenderPKM(152, 252, 'JOHTO') 
        })

    /* PKM HOENN */
    fetch(end_point_pkm)
        .then((resp) => resp.json())
        .then(async () => {
            await RenderPKM(252, 387, 'HOENN') 
        })

    /* PKM SINNOH */
    fetch(end_point_pkm)
        .then((resp) => resp.json())
        .then(async () => {
            await RenderPKM(387, 494, 'SINNOH') 
        })

    /* PKM UNOVA */
    fetch(end_point_pkm)
        .then((resp) => resp.json())
        .then(async () => {
            await RenderPKM(494, 650, 'UNOVA') 
        })

    /* PKM KALOS */
    fetch(end_point_pkm)
        .then((resp) => resp.json())
        .then(async () => {
            await RenderPKM(650, 722, 'KALOS') 
        })

    /* PKM ALOLA */
    fetch(end_point_pkm)
        .then((resp) => resp.json())
        .then(async () => {
            await RenderPKM(722, 810, 'ALOLA') 
        })

    /* PKM GALAR */
    fetch(end_point_pkm)
        .then((resp) => resp.json())
        .then(async () => {
            await RenderPKM(810, 899, 'GALAR') 
        })

    /* PKM TYPE */
    fetch(end_point_pkm)
        .then((resp) => resp.json())
        .then(async () => {
            for (let i = 1; i < 899; i++) {
                await fetch(end_point_pkm.concat(`${i}`))
                    .then((resp) => resp.json())
                    .then((data) => {
                        let k = 0;
                        let tamid = data.id;
                        if (data.id < 10) {
                            tamid = `00${data.id}`
                        }
                        if ((data.id >= 10) && (data.id < 100)) {
                            tamid = `0${data.id}`
                        }
                        if (data.types.length === 1) {
                            count = countType(data.types[0].type.name);
                            k = ktIDMore(count, 12);
                            if (data.abilities.length === 1) {
                                $(`#${data.types[0].type.name.toUpperCase()}>.container>.row`).append(`
                                <div class="col-lg-3 col-md-4 col-sm-6 col-6" id="more-${k}">
                                    <div class="card-pkm">
                                        <img src="../images/list_pokemon_bg.png" alt="" class="back-card">
                                        <div class="card-item-data">
                                            <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${tamid}.png" alt="...">
                                            <div class="card-body d-flex flex-column">
                                                <span>#${tamid}</span>
                                                <span>${data.name.toUpperCase()}</span>
                                                <div class="d-flex justify-content-center">
                                                    <a href="#" class="btn two-item btn-${data.types[0].type.name}">${data.types[0].type.name.toUpperCase()}</a>
                                                </div>
                                                <span>Abilities: <p>${data.abilities[0].ability.name}</p> </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                `)
                            }
                            else {
                                $(`#${data.types[0].type.name.toUpperCase()}>.container>.row`).append(`
                                <div class="col-lg-3 col-md-4 col-sm-6 col-6" id="more-${k}">
                                    <div class="card-pkm">
                                        <img src="../images/list_pokemon_bg.png" alt="" class="back-card">
                                        <div class="card-item-data">
                                            <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${tamid}.png" alt="...">
                                            <div class="card-body d-flex flex-column">
                                                <span>#${tamid}</span>
                                                <span>${data.name.toUpperCase()}</span>
                                                <div class="d-flex justify-content-center">
                                                    <a href="#" class="btn two-item btn-${data.types[0].type.name}">${data.types[0].type.name.toUpperCase()}</a>
                                                </div>
                                                <span>Abilities: <p>${data.abilities[0].ability.name} / ${data.abilities[1].ability.name}</p> </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                `)
                            }
                        }
                        else {
                            for (let n = 0; n < data.types.length; n++) {
                                count = countType(data.types[n].type.name);
                                k = ktIDMore(count, 12);
                                if (data.abilities.length === 1) {
                                    $(`#${data.types[n].type.name.toUpperCase()}>.container>.row`).append(`
                                    <div class="col-lg-3 col-md-4 col-sm-6 col-6" id="more-${k}">
                                        <div class="card-pkm">
                                            <img src="../images/list_pokemon_bg.png" alt="" class="back-card">
                                            <div class="card-item-data">
                                                <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${tamid}.png" alt="...">
                                                <div class="card-body d-flex flex-column">
                                                    <span>#${tamid}</span>
                                                    <span>${data.name.toUpperCase()}</span>
                                                    <div class="d-flex justify-content-around">
                                                        <a href="#" class="btn two-item btn-${data.types[0].type.name}">${data.types[0].type.name.toUpperCase()}</a>
                                                        <a href="#" class="btn two-item btn-${data.types[1].type.name}">${data.types[1].type.name.toUpperCase()}</a>
                                                    </div>
                                                    <span>Abilities: <p>${data.abilities[0].ability.name}</p> </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    `)
                                }
                                else {
                                    $(`#${data.types[n].type.name.toUpperCase()}>.container>.row`).append(`
                                    <div class="col-lg-3 col-md-4 col-sm-6 col-6" id="more-${k}">
                                        <div class="card-pkm">
                                            <img src="../images/list_pokemon_bg.png" alt="" class="back-card">
                                            <div class="card-item-data">
                                                <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${tamid}.png" alt="...">
                                                <div class="card-body d-flex flex-column">
                                                    <span>#${tamid}</span>
                                                    <span>${data.name.toUpperCase()}</span>
                                                    <div class="d-flex justify-content-around">
                                                        <a href="#" class="btn two-item btn-${data.types[0].type.name}">${data.types[0].type.name.toUpperCase()}</a>
                                                        <a href="#" class="btn two-item btn-${data.types[1].type.name}">${data.types[1].type.name.toUpperCase()}</a>
                                                    </div>
                                                    <span>Abilities: <p>${data.abilities[0].ability.name} / ${data.abilities[1].ability.name}</p> </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    `)
                                }
                            }
                        }
                    })
            }
        })

    /* crate count type */
    let normal = fighting = flying = poison = ground = rock = bug = ghost = steel = fire = water = grass = electric = psychic = ice = dragon = dark = fairy = 1;

    function countType(type) {
        switch (type)
        {
            case 'normal': {return normal++;}
            case 'fighting': {return fighting++;}
            case 'flying': {return flying++;}
            case 'poison': {return poison++;}
            case 'ground': {return ground++;}
            case 'rock': {return rock++;}
            case 'bug': {return bug++;}
            case 'ghost': {return ghost++;}
            case 'steel': {return steel++;}
            case 'fire': {return fire++;}
            case 'water': {return water++;}
            case 'grass': {return grass++;}
            case 'electric': {return electric++;}
            case 'psychic': {return psychic++;}
            case 'ice': {return ice++;}
            case 'dragon': {return dragon++;}
            case 'dark': {return dark++;}
            case 'fairy': {return fairy++;}
        }

    }  

    $('form').on('submit', evt);
    async function evt(e) {
        e.preventDefault();
        let kt = 0;
        
        let strSearch = $('form input').val();
        strSearch = strSearch.toLowerCase();
        $('form input').val('');
        let blockBtn = document.getElementById('block-btn')
        let more_btn = document.querySelector('#SEARCH').querySelector('#more-btn');
        more_btn.style.display = "none";
                
        if (strSearch === '') {
            $('#SEARCH>.container>.row').empty();
            more_btn.style.display = "block";
            RenderPKM(1, 899, "SEARCH")
        }
        else {
            $('#SEARCH>.container>.row').empty();
            for (let i = 1; i < 899; i++) {
                if (i < 898) {
                    blockBtn.disabled = true;
                }
                else {
                    blockBtn.disabled = false;
                }
                await fetch(end_point_pkm.concat(`${i}`))
                    .then((resp) => resp.json())
                    .then((data) => {
                        
                        let k=0;
                        let tamid = data.id.toString();
                        if (data.id < 10) {
                            tamid = `00${data.id}`
                        }
                        if ((data.id >= 10) && (data.id < 100)) {
                            tamid = `0${data.id}`
                        }
                        if ((data.name.search(strSearch) != -1) || (tamid.search(strSearch) != -1)) {
                            kt++;
                            k = ktIDMore(kt, 12);
                            if (kt > 12) {
                                more_btn.style.display = "block";
                            }
                            if (data.types.length === 1) {
                                if (data.abilities.length === 1) {
                                    $('#SEARCH>.container>.row').append(`
                                    <div class="col-lg-3 col-md-4 col-sm-6 col-6" id="more-${k}">
                                        <div class="card-pkm">
                                            <img src="../images/list_pokemon_bg.png" alt="" class="back-card">
                                            <div class="card-item-data">
                                                <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${tamid}.png" alt="...">
                                                <div class="card-body d-flex flex-column">
                                                    <span>#${tamid}</span>
                                                    <span>${data.name.toUpperCase()}</span>
                                                    <div class="d-flex justify-content-center">
                                                        <a href="#" class="btn two-item btn-${data.types[0].type.name}">${data.types[0].type.name.toUpperCase()}</a>
                                                    </div>
                                                    <span>Abilities: <p>${data.abilities[0].ability.name}</p> </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    `)
                                }
                                else {
                                    $('#SEARCH>.container>.row').append(`
                                    <div class="col-lg-3 col-md-4 col-sm-6 col-6" id="more-${k}">
                                        <div class="card-pkm">
                                            <img src="../images/list_pokemon_bg.png" alt="" class="back-card">
                                            <div class="card-item-data">
                                                <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${tamid}.png" alt="...">
                                                <div class="card-body d-flex flex-column">
                                                    <span>#${tamid}</span>
                                                    <span>${data.name.toUpperCase()}</span>
                                                    <div class="d-flex justify-content-center">
                                                        <a href="#" class="btn two-item btn-${data.types[0].type.name}">${data.types[0].type.name.toUpperCase()}</a>
                                                    </div>
                                                    <span>Abilities: <p>${data.abilities[0].ability.name} / ${data.abilities[1].ability.name}</p> </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    `)
                                }
                            }
                            else {
                                if (data.abilities.length === 1) {
                                    $('#SEARCH>.container>.row').append(`
                                    <div class="col-lg-3 col-md-4 col-sm-6 col-6" id="more-${k}">
                                        <div class="card-pkm">
                                            <img src="../images/list_pokemon_bg.png" alt="" class="back-card">
                                            <div class="card-item-data">
                                                <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${tamid}.png" alt="...">
                                                <div class="card-body d-flex flex-column">
                                                    <span>#${tamid}</span>
                                                    <span>${data.name.toUpperCase()}</span>
                                                    <div class="d-flex justify-content-around">
                                                        <a href="#" class="btn two-item btn-${data.types[0].type.name}">${data.types[0].type.name.toUpperCase()}</a>
                                                        <a href="#" class="btn two-item btn-${data.types[1].type.name}">${data.types[1].type.name.toUpperCase()}</a>
                                                    </div>
                                                    <span>Abilities: <p>${data.abilities[0].ability.name}</p> </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    `)
                                }
                                else {
                                    $('#SEARCH>.container>.row').append(`
                                    <div class="col-lg-3 col-md-4 col-sm-6 col-6" id="more-${k}">
                                        <div class="card-pkm">
                                            <img src="../images/list_pokemon_bg.png" alt="" class="back-card">
                                            <div class="card-item-data">
                                                <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${tamid}.png" alt="...">
                                                <div class="card-body d-flex flex-column">
                                                    <span>#${tamid}</span>
                                                    <span>${data.name.toUpperCase()}</span>
                                                    <div class="d-flex justify-content-around">
                                                        <a href="#" class="btn two-item btn-${data.types[0].type.name}">${data.types[0].type.name.toUpperCase()}</a>
                                                        <a href="#" class="btn two-item btn-${data.types[1].type.name}">${data.types[1].type.name.toUpperCase()}</a>
                                                    </div>
                                                    <span>Abilities: <p>${data.abilities[0].ability.name} / ${data.abilities[1].ability.name}</p> </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    `)
                                }
                            }
                        }
                    })
            }
            if (kt === 0) {
                $('#SEARCH>.container>.row').empty();
                $('#SEARCH>.container>.row').append(`
                <div class="not-found">
                    NOT FOUND POKEMON </div>
                `)
            }
        }
    }
})