// Helper Functions
function id(name){
  return document.getElementById(name);
}

function query(name){
  return document.querySelector(name);
}

// Decleration and Initialization

let storeTheDuration;
let storeTheValue;
let storeTheId;
let checking = false;
const MODAL = query('.modal');
const CANCEL = query('#cancel');
const ADD = query('#square');
const BODY = query('.body');
const NEWONE = id('newonecontainer');
const PROGRESS = id('progresscontainer');
const REVIEW = id('reviewcontainer');
const DONE = id('donecontainer');
let indexNumber;


let array = [{
  content:'ToDoApp',
  newone: true,
  progress: false,
  review: false,
  done: false,
  startDate:'2021-01-01',
  endDate: '2021-02-02',
  location: 'newonecontainer'
},
{
  content:'Doground',
  newone: false,
  progress: true,
  review: false,
  done: false,
  startDate:'2021-01-01',
  endDate: '2021-02-02',
  location: 'progresscontainer'
},
{
  content:'Mine Sweeper',
  newone: false,
  progress: false,
  review: true,
  done: false,
  startDate:'2021-01-01',
  endDate: '2021-02-02',
  location: 'reviewcontainer'
},
{
  content:'Typing Tutor',
  newone: false,
  progress: false,
  review: false,
  done: true,
  startDate:'2021-01-01',
  endDate: '2021-02-02',
  location: 'donecontainer'
}
];

localStorage.getItem('newAssignment') ? array = localStorage.getItem('newAssignment'):
localStorage.setItem('newAssignment', JSON.stringify(array));

array = JSON.parse(localStorage.getItem('newAssignment'));

let divisions =[
  'newone',
  'progress',
  'review',
  'done'
];

let createElement = function(box, j){
  let newDivElement = document.createElement('div');
  let newDivInsideDiv1 = document.createElement('span');
  let newDivInsideDiv = document.createElement('span');
  let editIcon = document.createElement('i');
  let deleteIcon = document.createElement('i');
  newDivElement.setAttribute('class', 'task');
  newDivElement.setAttribute('id', 'title' + j);
  newDivElement.setAttribute('draggable', 'true');
  newDivInsideDiv1.setAttribute('class', 'content');
  newDivInsideDiv1.setAttribute('id', 'content' + j);
  console.log(array, 'array', array[0], array[0].content, j);
  console.log(array[j], 'content');
  newDivInsideDiv1.innerText = array[j].content.toUpperCase();
  newDivInsideDiv.setAttribute('class', 'pending');
  newDivInsideDiv.setAttribute('id', 'pending' + j);
  editIcon.setAttribute('class', 'far fa-edit');
  deleteIcon.setAttribute('class', 'far fa-trash-alt');
  newDivElement.appendChild(newDivInsideDiv1);
  newDivElement.appendChild(newDivInsideDiv);
  newDivElement.appendChild(deleteIcon);
  newDivElement.appendChild(editIcon);
  box.appendChild(newDivElement);
  addActions();
  doEvent();
}

// Drag & Drop

let functionForDragStart = function(e){
  this.classList.add('scale');
  e.dataTransfer.setData('text', this.id);
  console.log(e.dataTransfer.getData('text'));
}

let functionForDragEnd = function(){
  this.clasList.remove('scale');
}

let functionForDrag = function(){
  console.log('Dragging');
}

let functionForDragEnter = function(e){
  e.preventDefault();
  console.log('enter');
  this.classList.add('border');
}

let functionForDragLeave = function(){
  console.log('left');
  this.classList.remove('border');
}

let functionForDrop = function(e){
  let ele = e.dataTransfer.getData('text');
  console.log(e.target);
  this.classList.remove('border');
  this.lastElementChild.appendChild(document.querySelector('#'+ele));
  console.log(this.lastElementChild);
  storeTheId = e.currentTarget.lastElementChild.id;
  storeTheValue = ele.slice(ele.length-1, ele.length);
  if(storeTheId == 'newonecontainer'){
    array[storeTheValue].progress = false;
    array[storeTheValue].newone = true;
    array[storeTheValue].review = false;
    array[storeTheValue].done = false;
    array[storeTheValue].location = 'newonecontainer';
  }
  if(storeTheId == 'progresscontainer'){
    array[storeTheValue].progress = true;
    array[storeTheValue].newone = false;
    array[storeTheValue].review = false;
    array[storeTheValue].done = false;
    array[storeTheValue].location = 'progresscontainer';
  }
  if(storeTheId == 'donecontainer'){
    array[storeTheValue].progress = false;
    array[storeTheValue].newone = false;
    array[storeTheValue].review = false;
    array[storeTheValue].done = true;
    array[storeTheValue].location = 'donecontainer';
  }
  if(storeTheId == 'reviewcontainer'){
    array[storeTheValue].progress = false;
    array[storeTheValue].newone = false;
    array[storeTheValue].review = true;
    array[storeTheValue].done = false;
    array[storeTheValue].location = 'reviewcontainer';
  }
  localStorage.setItem('newAssignment', JSON.stringify(array));
}

let functionForDragOver = function(e){
  e.preventDefault();
  this.classList.add('border');
}

// Adding Tasks

let addFunction = function(e){
  currentElement1 = e.currentTarget.parentNode.parentNode.id;
  console.log(e.currentTarget.parentNode.parentNode.id);
  MODAL.style.transform = 'scale(1)';
  MODAL.style.transition = '1s';
  query('.all').style.display = 'none';
  query('.all').style.transform = '1s';
}

ADD.addEventListener('click', addFunction);

// Submit

let creation = function(e){
  if(id('text').value.length && id('start').value.length && id('end').value.length > 0){
    MODAL.style.transform = 'scale(0)';
    MODAL.style.transition = '0.4s';
    query('.all').style.display = 'flex';
    query('.all').style.transform = '1s';
  if (!checking){
    array.push({
      content: id('text').value,
      newone: true,
      progress: false,
      review: false,
      done: false,
      startDate: id('start').value,
      endDate: id('end').value,
      location: 'newonecontainer'});
      console.log(id('text').value);
      console.log(id('start').value);
      console.log(id('end').value);
      id('text').value = id('start').value = id('end').value = " ";
      localStorage.setItem('newAssignment', JSON.stringify(array));
  }else{
    checking = false;
    array[indexNumber] = {
      content: id('text').value,
      newone: true,
      progress: false,
      review: false,
      done: false,
      startDate: id('start').value,
      endDate: id('end').value,
      location: currentElement1
    };
      console.log(currentElement1);
      console.log('Value Changed');
      localStorage.setItem('newAssignment', JSON.stringify(array));
      id('text').value = id('start').value = id('end').value = " ";
  }
  createDefaultAssignments();
}else{
  console.log('Fill The Doground');
}
}

let actionItems = function(e){
  if(e.target.classList == 'far fa-trash-alt'){
    textValue = e.currentTarget.id;
    textValue = textValue.slice(textValue.length-1, textValue.length);
    console.log(textValue);
    console.log(e.currentTarget);
    array.splice(textValue, 1);
    localStorage.setItem('newAssignment', JSON.stringify(array));
    createDefaultAssignments();
  }
  if(e.target.classList == 'far fa-edit'){
    textValue = e.currentTarget.id;
    textValue = textValue.slice(textValue.length-1, textValue.length);
    console.log(textValue);
    console.log("working");
    console.log(e.currentTarget.parentNode);
    currentElement1 = e.currentTarget.parentNode.id;
    checking = true;
    console.log(currentElement1);
    indexNumber = textValue;
    console.log(indexNumber);
    textValue = array[textValue];
    console.log(textValue.startDate);
    doEdit(textValue.content, textValue.startDate, textValue.endDate);
  }
}

let doEdit = function(text, start, end){
  MODAL.style.transform = 'scale(1)';
  MODAL.style.transition = '1s';
  query('.all').style.display = 'none';
  query('.all').style.transform ='1s';
  id('text').value = text;
  id('start').value = start;
  id('end').value = end;
}

id('sub').addEventListener('click', creation);

let cancelFunction = function(){
  id('text').value = id('start').value = id('end').value = " ";
  MODAL.style.transform = 'scale(0)';
  MODAL.style.transition = '0.4s';
  query('.all').style.display = 'flex';
  query('.all').style.transform = '1s';
  console.log('Who summoned me ?');
}

let addActions = function(){
  let taskActionItems = document.querySelectorAll('.task');
  taskActionItems.forEach(
    function(taskActionItem){
      taskActionItem.addEventListener('click', actionItems);
      taskActionItem.addEventListener('dragstart', functionForDragStart);
    }
  );
}

id('cancel').addEventListener('click', cancelFunction);

let doEvent = function(){
  for(let i=0; i<divisions.length; i++){
    let queryname = document.querySelector('#'+divisions[i]);
    console.log(queryname);
    queryname.addEventListener('dragenter', functionForDragEnter);
    queryname.addEventListener('dragover', functionForDragOver);
    queryname.addEventListener('dragleave', functionForDragLeave);
    queryname.addEventListener('drop', functionForDrop);
  }
}

let dateprocess = function(num){
  var date1 = new Date(array[num].startDate);
  var date2 = new Date(array[num].endDate);
  var Difference_In_Time = date2.getTime() - date1.getTime();
  var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
  if (Difference_In_Days < 0){
    id('pending'+ num).innerText = 'Not Available';
  }else if(Difference_In_Days <= 31){
    id('pending'+ num).innerText = 'Duration : '+ Difference_In_Days + " Days";
  }else if(Difference_In_Days <= 365){
    var month = parseInt(Difference_In_Days / 31);
    var days = Difference_In_Days % 31;
    if(month == 1 && days == 1){
      id('pending'+ num).innerText = ' Duration : '+ month + " Month and " + days + "Day";
    }else if(month == 1){
      id('pending'+ num).innerText = ' Duration : '+ month + " Month and " + days + "Days";
    }else if(days == 1){
      id('pending'+ num).innerText = ' Duration : '+ month + " Months and " + days + "Day";
    }else{
      id('pending'+ num).innerText = ' Duration : '+ month + " Months and " + days + "Days";
    }
  }
}

let createDefaultAssignments = function(){
  NEWONE.innerText = "";
  PROGRESS.innerText = "";
  REVIEW.innerText = "";
  DONE.innerText = "";
  console.log(array);

  for(let i=0; i<array.length; i++){
    console.log(array[i]);
    if (array[i].location == 'newonecontainer'){
      createElement(id('newonecontainer'), i);
      dateprocess(i);
      console.log(i);
    }else if (array[i].location == 'progresscontainer'){
      createElement(id('progresscontainer'), i);
      dateprocess(i);
    }else if (array[i].location == 'reviewcontainer'){
      createElement(id('reviewcontainer'), i);
      dateprocess(i);
    }else if (array[i].location == 'donecontainer'){
      createElement(id('donecontainer'), i);
      dateprocess(i);
    }
  }
}

createDefaultAssignments();
