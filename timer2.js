
start = document.querySelector(".start"),
breaks = document.querySelector(".break"),
clock = document.getElementById('countdown'),
tomato = document.querySelector('.tomato'),
tomatoimg = 'http://www.iconsalot.com/asset/icons/freepik/food-and-drink-2/512/071-tomato-icon.png';

start.addEventListener('click', function(){
    var totaltime = 3;
    start.classList.toggle('orange');
    //如果顯示startworking的時候，點下去接換成pause
    if (start.innerHTML === "計時") {
        start.innerHTML = "暫停";

        timer = setInterval(function(){
        var minutes = Math.floor(totaltime/60);
        var seconds = totaltime % 60;
        
        if (totaltime == 0) {
            clearInterval(timer);
            clock.innerHTML = "00:00";
            $(".tomato").append('<img src="tmt.png">');
//秒數歸零的時候停止timer
          } else {
                totaltime--;

                if (seconds < 10) {
                seconds = "0" + seconds;  
                  }
                if (minutes < 1) {
                minutes = "00";
                 }
              clock.innerHTML = minutes + ":" + seconds;
          }

        }, 1000);} 
    //如果顯示不是startworking的時候，點下去暫停並顯示startworking
    else {
        clearInterval(timer);
        start.innerHTML = "計時";         
    }    

    breaks.addEventListener('click',function(){
        clearInterval(timer);
        var totaltime = 3;
        tomato.innerHTML = '';
    })

});


//TODOLIST//
//1.get elements//
let itemForm = document.querySelector('.itemForm');
let itemInput = document.querySelector('.itemInput');
let itemList = document.querySelector('.itemList');
let clearBtn = document.querySelector('.clearBtn');
let feedBack = document.querySelector('.feedback');

let itemData = [];

//form submission//

itemForm.addEventListener('submit', function(e){
    e.preventDefault();
    let textValue = itemInput.value;
    if (textValue === ''){
        showFeedback('想做什麼就直說吧','alert');
        //danger 是 classnamer//
    } else {
        addItem(textValue);
        //clear the form
        itemInput.value = '';
        //add to the array
        //local storage
        itemData.push(textValue);
        //add event listener to icons
        handleItem(textValue);
    }
});



//showFeedBack function
function showFeedback(text,action){
    feedBack.classList.add('showItem',action);
    feedBack.innerHTML = `<p>${text}</p>`
    setTimeout(function(){
        feedBack.classList.remove('showItem');
    },3000);
}

//addItem function
function addItem(value) {
    let div = document.createElement('div');
    div.classList.add('item');
    div.innerHTML = `            <h5 class="itemName">${value}</h5>
    <div class="itemIcon">
        <a href="#" class="completeItem icon">
                <i class="far fa-check-circle"></i>
            </a>
        <a href="#" class="editItem icon">
                <i class="fas fa-edit"></i>
        </a>
        <a href="#" class="deleteItem icon">
                <i class="far fa-times-circle"></i>
        </a>
    </div>`;
    itemList.appendChild(div);
}

//icon functions

function handleItem(textValue) {
    let items = itemList.querySelectorAll('.item');
  //  let checkicon = itemList.querySelector('.completeItem');
  //  let itemName = itemList.querySelector('.itemName');
  

    items.forEach(function(item){
        //完成打勾項目
        if (item.querySelector('.itemName').textContent === textValue) {
            item.querySelector('.completeItem').addEventListener('click', function(){
                item.querySelector('.itemName').classList.toggle('isCompleted');
                this.classList.toggle('visible');
            });

        //編輯項目
        item.querySelector('.editItem').addEventListener('click',function(){
            itemInput.value = textValue;
            itemList.removeChild(item);
            itemData = itemData.filter(function(item){
                return item !== textValue;
            });
        })

        //刪除項目
        item.querySelector('.deleteItem').addEventListener('click',function(){
            itemList.removeChild(item);
            itemData = itemData.filter(function(item){
                return item !== textValue;
            });
        })
        }
    })
}

clearBtn.addEventListener('click',function(){
    itemData = [];
    let items = itemList.querySelectorAll('.item');
    if (items.length > 0) {
        items.forEach(function(item){
            itemList.removeChild(item);
        });
    }
})