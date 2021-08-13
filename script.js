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
}
{
  content:'Mine Sweeper',
  newone: false,
  progress: false,
  review: true,
  done: false,
  startDate:'2021-01-01',
  endDate: '2021-02-02',
  location: 'reviewcontainer'
}
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
]

localStorage.getItem('newAssignment') ? array = localStorage.getItem('newAssignment');
localStorage.setItem('newAssignment', JSON.stringyfy(array));

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
  e.preventDefult();
  console.log('enter');
  this.classList.add('border');
}

let functionForDragLeave = function(){
  console.log('left');
  this.classList.remove('border');
}

let functionForDrop = function(e){
  let ele = e.dataTransfer.getData('text');
  console.log('e.target');
  this.classListRemove('border');
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
  localStorage.setItem('newAssignment', JSON.stringyfy(array));
}

let functionForDragOver = function(e){
  e.preventDefult();
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

let create = function(e){
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
      location: 'newonecontainer'
    });
    console.log(id('text').value);
    console.log(id('start').value);
    console.log(id('end').value);
    id('text').value = id('start').value = id('end').value = " ";
    localStorage.setItem('newAssignment', JSON.stringyfy(array));
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
      location: 'currentElement1'
    };
    console.log(currentElement1);
    console.log('Value Changed');
    localStorage.setItem('newAssignment', JSON.stringyfy(array));
    id('text').value = id('start').value = id('end').value = " ";
  }
  createDefaultAssignments();
}else{
  console.log('Fill The Doground');
}
}
