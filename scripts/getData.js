document.addEventListener("DOMContentLoaded", getDataFromIndexDB(1) )
let qusetion = document.querySelector('.quiz-show__question-text')
let label1 = document.querySelector('.quiz-show__label.one')
let label2 = document.querySelector('.quiz-show__label.two')
let label3 = document.querySelector('.quiz-show__label.three')
let label4 = document.querySelector('.quiz-show__label.four')
let form = document.querySelector('form')
let number = document.querySelector('.number')
let finish = document.querySelector('.btn input-submit')
let radio = document.querySelectorAll("input[type='radio']")
let timer = document.querySelector(".quiz-show__countdown")
let timerBG = document.querySelector(".quiz-show__timer")
let allLabel = document.querySelectorAll('.quiz-show__label')
let question = document.querySelector('.quiz-show__question')
let count = 1
let startTime = 20
let countOfRight=0

const userAnswers=[]
let timeId = setInterval(countDown, 1000)



function catchingUserAnswer(radio){
	let tem=''
   radio.forEach(item=>{
		 if (item.checked){
			 tem = item.nextElementSibling.innerHTML } 
	 })
	 return tem
}






form.addEventListener('submit',(e)=>{
	e.preventDefault()
	
	form.classList.add('slide1')
	console.log(e.target.style.animationName='slide1')
	radio.forEach(item => {
		if (item.checked === false){
			//validate
			// console.log('validate')
			
		} else {
				count++
			if (count >10) {

				e.target.lastElementChild.lastElementChild.value = 'Finish'
				clearInterval(timeId)
				userAnswers.push(catchingUserAnswer(radio))
				gettingData__findingRightAnswer()
				//  setTimeout(() => {
				// 	 form.style.display = 'none'
				// 	 question.style.display = 'none' 
				//  }, 1000);
				//finishUp
			} if (count <= 10) {
				userAnswers.push(catchingUserAnswer(radio))
				  getDataFromIndexDB(count)
					radio.forEach(item => {
					item.checked = false
				})
				number.innerHTML = count
			}
		}
	})
	form.classList.remove('slide1')
})



function countDown(){
	if(startTime===0)
	clearInterval(timeId)
	if(startTime==5){
		timerBG.style.background ='#EE1B1B'
	}
  timer.innerHTML=startTime
  startTime--
 if(startTime==-1){
	//  setTimeout(() => {
	// 	 form.style.display = 'none'
	// 	 question.style.display = 'none' 
	// 	 userAnswers.push(catchingUserAnswer(radio))
	// 	 gettingData__findingRightAnswer()
	//  }, 1800)
}
}


function getDataFromIndexDB(key){
	const requestDB = window.indexedDB.open('ss')
	requestDB.onsuccess = () => {
		let db = requestDB.result.transaction('quiz').objectStore('quiz').get(key)
		db.onsuccess = () => {
			let result=db.result
			
			populateQuiz(result, creatingRandomOrder(result))
		   
		}
	}

}





function gettingData__findingRightAnswer(){
	const arr = []
	const requestDB = window.indexedDB.open('ss')
	  requestDB.onsuccess = () => {
		let db = requestDB.result.transaction('quiz').objectStore('quiz').getAll()
		  db.onsuccess = () => {
		       db.result.map(item=>{
             he.decode(item.right)
						 arr.push(he.decode(item.right))})
				console.log(tallyAnswers(arr,userAnswers))
					
					}

}}


function  tallyAnswers(arr1,arr2){
	let right = 0
   for (let i = 0; i < arr1.length; i++) {
		    if(arr1[i]==arr2[i]){
						 right++
				}
	}
	return right
}



function creatingRandomOrder(obj){
   
	let randomval = []
	console.log(obj)
	let valArr = Object.values(obj)
	valArr.splice(0, 1)
	while(randomval.length<valArr.length){
		 let index = Math.floor(Math.random() * valArr.length)
	     if (!randomval.includes(valArr[index])) {
	         randomval.push(valArr[index])
	     }
	 }
	 return randomval
}





function populateQuiz(result,arr){
	
	qusetion.innerHTML=result.quiz
	label1.innerHTML=arr[0]
	label2.innerHTML = arr[1]
	label3.innerHTML = arr[2]
	label4.innerHTML = arr[3]
}

if (performance.navigation.type == 1 || performance.navigation.type == 2) {
	location.href='/dist/'
	var req = indexedDB.deleteDatabase('ss');
} else {
	console.info("This page is not reloaded");
}