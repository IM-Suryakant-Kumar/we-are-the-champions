import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://we-are-the-champions-b0036-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementListInDB = ref(database, "edorsements")

const inputEl = document.getElementById("input-el")
const publishBtn = document.getElementById("publish-btn")
const edorsements = document.getElementById("ul-el")

publishBtn.addEventListener("click", function() {
    let inputValue = inputEl.value
    clearInputValue()
    push(endorsementListInDB, inputValue)
})

onValue(endorsementListInDB, function(snapshot) {
    if(snapshot.exists()) {
        let itemArr = Object.entries(snapshot.val())
        
        clearEdorsements()
    
        for(let i = 0; i < itemArr.length; i++) {
            let currentItem = itemArr[i]
            
            appendItemsToEndorsement(currentItem)
        }
    } else {
        edorsements.innerHTML = "No items exists... yet!"
    }
})

function clearInputValue() {
    inputEl.value = ""
}

function clearEdorsements() {
    edorsements.innerHTML = ""
}

function appendItemsToEndorsement(item) {
    let itemID = item[0]
    let itemValue = item[1]
    
    let li = document.createElement("li")
    li.textContent = itemValue
    edorsements.append(li)
    
    li.addEventListener("dblclick", function() {
        let exactLocationOfItemInDB = ref(database, `edorsements/${itemID}`)
        
        remove(exactLocationOfItemInDB)
    })
}

