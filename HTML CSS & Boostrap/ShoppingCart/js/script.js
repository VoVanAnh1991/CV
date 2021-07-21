var list_product = [
    {
        id: 1,
        name: "product_1",
        price: 1000,
        quantity: 2,
    },
    {
        id: 2,
        name: "product_2",
        price: 1500,
        quantity: 2,
    },
    {
        id: 3,
        name: "product_3",
        price: 2000,
        quantity: 2,
    },
    {
        id: 4,
        name: "product_4",
        price: 2500,
        quantity: 2,
    }
]

var tbody;
var id_current;
var isAddNew = true;

var loadData = () => {
    tbody.innerHTML="";
    list_product.forEach(item => {

        let tr = document.createElement("tr");
        tbody.appendChild(tr);
    
        let thID = document.createElement("th");
        thID.scope = "row";
        thID.className = "align-middle text-center";
        tr.appendChild(thID);

            let id = document.createTextNode(item.id);
            thID.appendChild(id);
        
        let thName = document.createElement("th");
        thName.scope = "row";
        thName.className = "text-primary align-middle";
        tr.appendChild(thName);

            let name = document.createTextNode(item.name);
            thName.appendChild(name);

        let tdPrice = document.createElement("td");
        tdPrice.scope = "row";
        tdPrice.className = "col-2 text-right align-middle";
        tdPrice.style = "text-align: right; padding: 1px";
        tr.appendChild(tdPrice);
        
        let price = document.createTextNode(item.price);
        tdPrice.appendChild(price);
        
        let tdCurrency = document.createElement("td");
        tdCurrency.scope = "row";
        tdCurrency.className = "col-1 align-middle";
        tdCurrency.style = "padding: 1px";
        tr.appendChild(tdCurrency);
        
        let currency = document.createTextNode("đ");
        tdCurrency.appendChild(currency);
        
        let tdQuantity = document.createElement("td");
        tdQuantity.scope = "row";
        tdQuantity.className = "align-middle text-center";
        tr.appendChild(tdQuantity);

            let quantity = document.createTextNode(item.quantity);
            tdQuantity.appendChild(quantity);
    
        let tdAction = document.createElement("td");
        tdAction.scope = "row";
        tdAction.className = "align-middle text-center";
        tr.appendChild(tdAction);
        
            let delBtn = document.createElement("button");
            delBtn.type = "button";
            delBtn.value = item.id;
            delBtn.className = "btn btn-danger btn-sm";
            tdAction.appendChild(delBtn);

                let delBtnText = document.createTextNode("Delete");
                delBtn.appendChild(delBtnText);

                delBtn.addEventListener("click", () => {
                    let a = delBtn.value - 1;
                    list_product.splice(a, 1);
                    for(i = 0; i < list_product.length; i++) {
                        if (i == 0) {
                            list_product[i].id = 1;
                            list_product[i].value = 1;
                        }
                        else {
                            list_product[i].id = list_product[i-1].id + 1;
                            list_product[i].value = list_product[i-1].id + 1;
                        }
                    }
                    loadData();
                });
        
            let editBtn = document.createElement("button");
            editBtn.type = "button";
            editBtn.value = item.id;
            editBtn.className = "btn btn-primary btn-sm m-1";
            tdAction.appendChild(editBtn);

                let editBtnText = document.createTextNode("Edit");
                editBtn.appendChild(editBtnText);

                editBtn.addEventListener("click", () => {
                    document.querySelector("#id").value = list_product[editBtn.value - 1].id;
                    document.querySelector("#name").value = list_product[editBtn.value - 1].name;
                    document.querySelector("#price").value = list_product[editBtn.value - 1 ].price;
                    document.querySelector("#quantity").value = list_product[editBtn.value - 1].quantity;

                    let modal = new bootstrap.Modal(document.querySelector("#productModal"));
                    modal.show();

                    isAddNew = false;
                });
    });
    id_current = list_product.length + 1;
    document.querySelector("#id").value = id_current;
};
   
var resetModal = () => {
    id_current = list_product.length + 1;
    document.querySelector("#id").value = id_current;
    document.querySelector("#name").value = "";
    document.querySelector("#price").value = "";
    document.querySelector("#quantity").value = "";
}

var blankAlert = () => {
    let modalBody = document.querySelector(".modal-body");
    let alertNote = document.createElement("p");
    modalBody.appendChild(alertNote);
    alertNote.className="text-danger fw-bold";
    let alertNoteText = document.createTextNode("***Please enter all the informations above!");
    alertNote.appendChild(alertNoteText);
    
}

var btnSave_Click = () => {
    let id = parseInt(document.querySelector("#id").value);
    let name = document.querySelector("#name").value;
    let price = parseInt(document.querySelector("#price").value);
    let quantity = parseInt(document.querySelector("#quantity").value);
    if (name==""||isNaN(price)||isNaN(quantity)) {
        blankAlert();
    }
    else {
        if (isAddNew == true) {
        let product = {
            id: id,
            name: name,
            price: price,
            quantity: quantity
        }
        list_product.push(product);
        }
        else {
            list_product.forEach(item => {
                if (item.id == id) {
                    item.name = name;
                    item.price = price;
                    item.quantity = quantity;
                    return;
                }
            })
        }

        isAddNew = true;

        loadData();
        resetModal();   

        let modal = bootstrap.Modal.getInstance(document.querySelector("#productModal"));
        modal.hide();
    }
};


var btnClose_Click = () => {
    loadData();
    resetModal();
};


(()=> {
    tbody = document.querySelector("tbody");
    
    loadData();

    btnSave = document.querySelector("#btnSave");
    btnSave.addEventListener("click", btnSave_Click);

    btnClose = document.querySelector("#btnClose");
    btnClose.addEventListener("click", btnClose_Click);

    symbolClose = document.querySelector("#symbolClose");
    symbolClose.addEventListener("click", btnClose_Click);

    modal = bootstrap.Modal.getInstance(document.querySelector("#productModal"));
    modal.addEventListener('hidePrevented.bs.modal', btnClose_Click);

})()


