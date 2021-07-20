$(document).ready(() => {

    /* Pokedex */
    const end_point_pkm = 'https://pokeapi.co/api/v2/pokemon/';
    const pkm = [];
    pkm[0] = Math.floor(Math.random() * 898)+1;
    for (let i = 1; i < 9; i++) {
        let temp = Math.floor(Math.random() * 898)+1;
        for (let j = 0; j < i; j++) {
            if (pkm[j] != temp) {
                pkm[i] = temp;
            }
            else {
                i--;
                break;
            }
        }
    }

    let tempdem = 0;
    for (let k = 0; k < 9; k++) {
        fetch(end_point_pkm.concat(`${pkm[k]}`))
            .then((resp) => resp.json())
            .then((data) => {
                tempdem++;
                let tamid = data.id;
                if (data.id < 10) {
                    tamid = `00${data.id}`
                }
                if ((data.id >= 10) && (data.id < 100)) {
                    tamid = `0${data.id}`
                }
                if (tempdem === 9) {
                    $('.center')
                    .not('.slick-initialized')
                    .slick({
                        centerMode: true,
                        infinite: true,
                        slidesToShow: 5,
                        speed: 400,
                        variableWidth: false,
                        responsive: [
                            {
                                breakpoint: 1200,
                                settings: {
                                    arrows: true,
                                    centerMode: true,
                                    slidesToShow: 3
                                }
                            },
                            {
                                breakpoint: 576,
                                settings: {
                                    arrows: false,
                                    centerMode: true,
                                    slidesToShow: 1
                                }
                            }
                        ]
                    })
                }
                else {
                    if (data.types.length === 1) {
                        if (data.abilities.length === 1) {
                            $('.center').append(`
                            <div>
                                <img src="../images/list_pokemon_bg.png" alt="" class="back-card">
                                <div class="card-item-data">
                                    <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${tamid}.png" alt="...">
                                    <div class="card-body d-flex flex-column">
                                        <span>#${tamid}</span>
                                        <span>${data.name.toUpperCase()}</span>
                                        <div class="d-flex">
                                            <a href="#" class="btn one-item btn-${data.types[0].type.name}">${data.types[0].type.name.toUpperCase()}</a>
                                        </div>
                                        <span>Abilities: <p>${data.abilities[0].ability.name}</p> </span>
                                    </div>
                                </div>
                            </div>`)
                        }
                        else {
                            $('.center').append(`
                            <div>
                                <img src="../images/list_pokemon_bg.png" alt="" class="back-card">
                                <div class="card-item-data">
                                    <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${tamid}.png" alt="...">
                                    <div class="card-body d-flex flex-column">
                                        <span>#${tamid}</span>
                                        <span>${data.name.toUpperCase()}</span>
                                        <div class="d-flex">
                                            <a href="#" class="btn one-item btn-${data.types[0].type.name}">${data.types[0].type.name.toUpperCase()}</a>
                                        </div>
                                        <span>Abilities: <p>${data.abilities[0].ability.name} / ${data.abilities[1].ability.name}</p> </span>
                                    </div>
                                </div>
                            </div>`)

                        }
                    }
                    else {
                        if (data.abilities.length === 1) {
                            $('.center').append(`
                            <div>
                                <img src="../images/list_pokemon_bg.png" alt="" class="back-card">
                                <div class="card-item-data">
                                    <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${tamid}.png" alt="...">
                                    <div class="card-body d-flex flex-column">
                                        <span>#${tamid}</span>
                                        <span>${data.name.toUpperCase()}</span>
                                        <div class="d-flex">
                                            <a href="#" class="btn two-item btn-${data.types[0].type.name}">${data.types[0].type.name.toUpperCase()}</a>
                                            <a href="#" class="btn two-item btn-${data.types[1].type.name}">${data.types[1].type.name.toUpperCase()}</a>
                                        </div>
                                        <span>Abilities: <p>${data.abilities[0].ability.name}</p> </span>
                                    </div>
                                </div>
                            </div>`)
                        }
                        else {
                            $('.center').append(`
                            <div>
                                <img src="../images/list_pokemon_bg.png" alt="" class="back-card">
                                <div class="card-item-data">
                                    <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${tamid}.png" alt="...">
                                    <div class="card-body d-flex flex-column">
                                        <span>#${tamid}</span>
                                        <span>${data.name.toUpperCase()}</span>
                                        <div class="d-flex">
                                            <a href="#" class="btn two-item btn-${data.types[0].type.name}">${data.types[0].type.name.toUpperCase()}</a>
                                            <a href="#" class="btn two-item btn-${data.types[1].type.name}">${data.types[1].type.name.toUpperCase()}</a>
                                        </div>
                                        <span>Abilities: <p>${data.abilities[0].ability.name} / ${data.abilities[1].ability.name}</p> </span>
                                    </div>
                                </div>
                            </div>`)
                        }
                    }
                }
            })
    }

    /* Pokemovie */
    const mv = [];
    mv[0] = Math.floor(Math.random() * 22);
    for (let i = 1; i < 7; i++) {
        let temp = Math.floor(Math.random() * 22);
        for (let j = 0; j < i; j++) {
            if (mv[j] != temp) {
                mv[i] = temp;
            }
            else {
                i--;
                break;
            }
        }
    }
    
    const dlmovie = $.getJSON("../js/movie.json", function () {
        for (let i = 0; i < 7; i++) {
            $('.movie').append(`
                <div class="d-flex flex-column">
                    <img src="${dlmovie.responseJSON[mv[i]].image}" alt="...">
                    <div>
                        <p>MOVIE ${dlmovie.responseJSON[mv[i]].id}</p>
                        <p>${dlmovie.responseJSON[mv[i]].name.toUpperCase()}</p>
                    </div>
                </div>`)
        }
        $('.movie').slick({
                centerMode: true,
                infinite: true,
                slidesToShow: 3,
                speed: 800,
                variableWidth: false,
                responsive: [
                    {
                        breakpoint: 768,
                        settings: {
                            arrows: false,
                            centerMode: true,
                            slidesToShow: 3
                        }
                    },
                    {
                        breakpoint: 576,
                        settings: {
                            arrows: false,
                            centerMode: true,
                            slidesToShow: 1
                        }
                    }
                ]
            });
    }) 

})