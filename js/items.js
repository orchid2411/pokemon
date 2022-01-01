async function detailItem(item_name){
    const end_point_item_detail = 'https://pokeapi.co/api/v2/item/'
    let resp_item_detail = await fetch(end_point_item_detail.concat(`${item_name}`))
    let kq_item_detail = await resp_item_detail.json()

    $(`#${item_name}>.item-img`).append(`
        <img src="${kq_item_detail.sprites.default}">
    `)
    $(`#${item_name}>.item-effect`).append(`
        <span>${kq_item_detail.effect_entries[0].short_effect}</span>
    `)
}

function changeCategory(itemname){
    let divitem = $(`.item-pkm`)
    for (let i = 0; i< divitem.length; i++) {
        divitem[i].style.display = "none";
    }

    let item = $(`#${itemname}`)
    item[0].style.display = "block";
}

async function renderitem(){
    
    const end_point_item_category = 'https://pokeapi.co/api/v2/item-category/'
    const end_point_item_pocket = 'https://pokeapi.co/api/v2/item-pocket/'

    let resp_item_pocket = await fetch(end_point_item_pocket)
    let kq_item_pocket = await resp_item_pocket.json()

    for (let i = 1; i < kq_item_pocket.count + 1; i++){
        let resp_item_pocket_data = await fetch(end_point_item_pocket.concat(`${i}`))
        let kq_item_pocket_data = await resp_item_pocket_data.json()

        if (kq_item_pocket_data.categories.length > 9){
            $('.items>ul').append(`
                <li>
                    <div class="dropdown">
                        <h4>${kq_item_pocket_data.name.charAt(0).toUpperCase() + kq_item_pocket_data.name.slice(1)}<div class="cate-title"></div></h4>
                        <div class="dropdown-content ${kq_item_pocket_data.name}">
                        </div>
                        <div class="dropdown-content2 ${kq_item_pocket_data.name}2">
                        </div>
                    </div>
                </li>
            `)
        }
        else {
            $('.items>ul').append(`
                <li>
                    <div class="dropdown">
                        <h4>${kq_item_pocket_data.name.charAt(0).toUpperCase() + kq_item_pocket_data.name.slice(1)}<div class="cate-title"></div></h4>
                        <div class="dropdown-content ${kq_item_pocket_data.name}">
                        </div>
                    </div>
                </li>
            `)
        }
    }
    
    for (let i = 1; i < kq_item_pocket.count + 1; i++){
        let resp_item_pocket_data = await fetch(end_point_item_pocket.concat(`${i}`))
        let kq_item_pocket_data = await resp_item_pocket_data.json()
        for (let j = 0; j < kq_item_pocket_data.categories.length; j++){
            if (j > 9) {
                $(`.${kq_item_pocket_data.name}2`).append(`
                    <a onclick="changeCategory('${kq_item_pocket_data.categories[j].name}')">${kq_item_pocket_data.categories[j].name.replace(/-/g, ' ')}<div class="cate-item"></div></a>
                `)
            }
            else {
                $(`.${kq_item_pocket_data.name}`).append(`
                    <a onclick="changeCategory('${kq_item_pocket_data.categories[j].name}')">${kq_item_pocket_data.categories[j].name.replace(/-/g, ' ')}<div class="cate-item"></div></a>
                `)
            }
            $(`.item-list`).append(`
                <div class="item-pkm" id="${kq_item_pocket_data.categories[j].name}">
                    <h4>${kq_item_pocket_data.name.charAt(0).toUpperCase() + kq_item_pocket_data.name.slice(1)} -> ${kq_item_pocket_data.categories[j].name.replace(/-/g, ' ')}</h4>
                    <div class="row">
                        <div class="col-1">
                        </div>
                        <div class="col-1">
                            <h5>Image</h5>
                        </div>
                        <div class="col-2">
                            <h5>Name</h5>
                        </div>
                        <div class="col-8">
                            <h5>Effect</h5>
                        </div>
                    <hr>
                    </div>
                </div>
            `)
            if ((i === 1) && (j === 0)) {
                let page = $(`.item-list>#${kq_item_pocket_data.categories[j].name}`)
                page[0].style.display = "block"
            }
        }

        for (let j = 0; j < kq_item_pocket_data.categories.length; j++){
            let resp_item = await fetch(end_point_item_category.concat(`${kq_item_pocket_data.categories[j].name}`))
            let kq_item = await resp_item.json()

            for (let k = 0; k < kq_item.items.length; k++){
                $(`#${kq_item_pocket_data.categories[j].name}`).append(`
                    <div class="row" id="${kq_item.items[k].name}">
                        <div class="col-1">
                        </div>
                        <div class="col-1 item-img">
                        </div>
                        <div class="col-2">
                            <a class=item-name>${kq_item.items[k].name.charAt(0).toUpperCase()+ kq_item.items[k].name.slice(1).replace(/-/g, ' ')}</a>
                        </div>
                        <div class="col-8 item-effect">
                        </div>
                        <hr>
                    </div>
                `)
                detailItem(kq_item.items[k].name)
            }
        }
    }
}

$(document).ready(() => {
    renderitem()
})