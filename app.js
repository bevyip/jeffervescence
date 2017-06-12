class App{
  constructor(selectors) {
    this.flicks = []
    this.max = 0
    this.list = document.querySelector(selectors.listSelector)
    this.template = document.querySelector(selectors.templateSelector)
    document
      .querySelector(selectors.formSelector)
      .addEventListener('submit', this.addFlickViaForm.bind(this))
    this.load()
  }

  // load saved data when browser refreshes
  load(){
    //Get JSON string out of localStorage
    const flicksJSON = localStorage.getItem('flicks')
    //Turn that into an array
    const flicksArray = JSON.parse(flicksJSON)
    //Set this.flicks to that array
    if (flicksArray){
      flicksArray
        .reverse()
        .map(this.addFlick.bind(this))
    }
  }

  addFlick(flick) {
    const listItem = this.renderListItem(flick)
    const yearLabel = document.createElement('yearLabel')
    var editButton = document.createElement('button')
    var promoteButton = document.createElement('button')
    var deleteButton = document.createElement('button')
    var upButton = document.createElement('button')
    var downButton = document.createElement('button')
    listItem.spellcheck = false;

    listItem.classList.add('mainFlick')
    yearLabel.classList.add('yearLabel')
    editButton.classList.add('edit')
    editButton.classList.add('noclicked')
    upButton.classList.add('up')
    downButton.classList.add('down')
    deleteButton.classList.add('del')
    promoteButton.classList.add('promo')
    promoteButton.classList.add('notclicked')

    yearLabel.textContent = flick.year
    editButton.textContent = '🖋'
    promoteButton.textContent = '❤'
    deleteButton.textContent = '🗑'
    upButton.textContent = '👆'
    downButton.textContent = '👇'

    listItem.appendChild(yearLabel)
    listItem.appendChild(editButton)
    listItem.appendChild(promoteButton)
    listItem.appendChild(deleteButton)
    listItem.appendChild(upButton)
    listItem.appendChild(downButton)
    this.list.appendChild(listItem)
  
    editButton.addEventListener("click", editFunction.bind(this))
    upButton.addEventListener("click", upFunction.bind(this))
    downButton.addEventListener("click", downFunction.bind(this))
    deleteButton.addEventListener("click", anotherFunction.bind(this))
    promoteButton.addEventListener("click", myFunction.bind(this))

    let initialText = null
    let initialYear = null

    function editFunction(e){
      const yearFlick = e.target.closest(".mainFlick").querySelector('.yearLabel')
      const mainFlick = e.target.closest(".mainFlick").querySelector('.flick-name')
      //mainFlick.addEventListener("blur", blurFunction.bind(this))
      //yearFlick.addEventListener("blur", blurFunction.bind(this))

      // function blurFunction(){
      //     editButton.classList.add('noclicked')
      //     initialText = mainFlick.textContent
      //     initialYear = yearFlick.textContent
      //     mainFlick.contentEditable = false
      //     mainFlick.style.backgroundColor = '#DDA0DD'
      //     yearFlick.contentEditable = false
      //     yearFlick.style.backgroundColor = '#DDA0DD'
      //     editButton.classList.remove('yesclicked')
          
      //     for (let i=0; i < this.flicks.length; i++){ //don't use var
      //         console.log(initialText)
      //         if (this.flicks[i].name === initialText) {
      //           this.flicks[i].name = mainFlick.textContent
      //           this.flicks[i].year = yearFlick.textContent
      //           this.save()
      //           //console.log(this.flicks)
      //           break;
      //         }
      //       }
      // }

      if (editButton.classList.contains('noclicked')){
            editButton.classList.add('yesclicked')
            const yearFlick = e.target.closest(".mainFlick").querySelector('.yearLabel')
            const mainFlick = e.target.closest(".mainFlick").querySelector('.flick-name')
            initialText = mainFlick.textContent
            initialYear = yearFlick.textContent
            yearFlick.contentEditable = true
            yearFlick.style.backgroundColor = 'white'
            yearFlick.style.padding = "5px"
            mainFlick.contentEditable = true
            mainFlick.style.backgroundColor = 'white'
            mainFlick.style.padding = "5px"
            mainFlick.focus()
            editButton.classList.remove('noclicked')
            this.save()
      }else{
            editButton.classList.add('noclicked')
            const mainFlick = e.target.closest(".mainFlick").querySelector('.flick-name')
            const yearFlick = e.target.closest(".mainFlick").querySelector('.yearLabel')
            mainFlick.contentEditable = false
            mainFlick.style.background = 'none'
            yearFlick.contentEditable = false
            yearFlick.style.background = 'none'
            editButton.classList.remove('yesclicked')
            for (let i=0; i < this.flicks.length; i++){ //don't use var          
              if (this.flicks[i].name === initialText) {
                this.flicks[i].name = mainFlick.textContent
                this.flicks[i].year = yearFlick.textContent
                this.save()
                break;
              }
            }
      }
      
    }
    
    function upFunction(e){
      
      const text = e.target.parentNode.textContent[0]
      var index = 0;
      for (var i=0; i<this.flicks.length; i++){
        if (this.flicks[i].name === text) {
          index = i
          break
        }
      }
      
      //const index = this.flicks.findIndex((current)){
      //   return currentFlick.id === flick.id
      // }
      //Alternative

      if (index > 0){
        const next = this.flicks[index-1]
        const curr = this.flicks[index]
        this.flicks[index-1] = curr
        this.flicks[index] = next
      }
      
      const nextLi = e.target.parentNode.previousElementSibling;

      if(!nextLi){
        return;
      }

      if (nextLi.classList.contains('template')){
        return;
      }
      this.list.insertBefore(e.target.parentNode, e.target.parentNode.previousSibling)
      
      this.save() 
    }

    function downFunction(e){
      const text = e.target.parentNode.textContent[0]
      var index = 0;
      for (var i=0; i<this.flicks.length; i++){
        if (this.flicks[i].name === text) {
          index = i
          break
        }
      }
      
      let next = null
      let curr = null

      if (index !== this.flicks.length-1){
        next = this.flicks[index+1]
        curr = this.flicks[index]
        this.flicks[index+1] = curr
        this.flicks[index] = next
        
      }else{
        return;
      }
      const nextLi = e.target.parentNode.nextElementSibling;

      if(!nextLi){
        return;
      }

      if (nextLi.classList.contains('template')){
        return;
      }
      if (e.target.parentNode.nextSibling){
        this.list.insertBefore(e.target.parentNode, e.target.parentNode.nextSibling.nextSibling)
      }
      this.save()
    }
   
    //delete
    function anotherFunction(ev){
      for (let i=0; i < this.flicks.length; i++){ //don't use var
        if (this.flicks[i].name === flick.name) {
          this.flicks.splice(i,1);
          break;
        }
      }
      this.list.removeChild(listItem)
      this.save()
      
      //Alternative:
      //const lisItem = ev.target.closest('.flick')
      //listItem.remove()
    }

    //promote
    function myFunction(ev){
        if (promoteButton.classList.contains('notclicked')){
            promoteButton.classList.add('clicked')
            listItem.style.backgroundColor = 'yellow'
            listItem.style.textTransform = "uppercase"
            listItem.style.fontSize = '23px'
            promoteButton.classList.remove('notclicked')
            //console.log(this)
            this.save()
        }else{
            listItem.style.backgroundColor = '#DDA0DD'
            promoteButton.classList.add('notclicked')
            listItem.style.textTransform = "none"
            listItem.style.fontSize = '20px'
            promoteButton.classList.remove('clicked')
            //console.log(this)
            this.save()
        }
    }

    this.list.insertBefore(listItem, this.list.firstChild)
    if (flick.id > this.max){
        this.max = flick.id
    }
    this.flicks.unshift(flick)
    this.save()
  }

  // favFlick(flick, ev){
  //   const listItem = ev.target.closest('.flick')
  //   flick.fav = !flick.fav

  //   if (flick.fav) {
  //     listItem.classList.add('fav')
  //   } else {
  //     listItem.classList.remove('fav')
  //   }
  //   this.save()
  // },

  addFlickViaForm(ev) {
    ev.preventDefault()
    const f = ev.target
    const flick = {
      id: this.max + 1,
      name: f.flickName.value,
      year: f.flickYear.value,
    }

    //Add flick to this.flicks
    //this.flicks.unshift(flick)
    
    //this.save()
    //unshift method adds element to start of array and returns new length
    //shift method removes first element from array and returns that element
    
    this.addFlick(flick)
    
    f.reset()
  }
 
  //stores info in browsers wuhuuuuu  
  save(){
    localStorage
      .setItem('flicks', JSON.stringify(this.flicks))
  
  }

  renderListItem(flick) {
    const item = this.template.cloneNode(true)
    item.classList.remove('template')
    item
      .querySelector('.flick-name')
      .textContent = flick.name 
    
    // if (flick.fav){
    //   item.classList.add('fav')
    // }
    // for promote button to persist ABOVE

    // ways to add buttons onto list BELOW
    // item
    //   .querySelector('.flick-name')
    //   .addEventListener('keypress', this.saveOnEnter.bind(this, flick))

    // item
    //   .querySelector('button.remove')
    //   .addEventListener('click', this.removeFlick.bind(this))
    // item
    //   .querySelector('button.fav')
    //   .addEventListener('click', this.favFlick.bind(this, flick))
    // item
    //   .querySelector('button.move-up')
    //   .addEventListener('click', this.moveUp.bind(this, flick))
    // item
    //   .querySelector('button.move-down')
    //   .addEventListener('click', this.moveDown.bind(this, flick))
    // item
    //   .querySelector('button.edit')
    //   .addEventListener('click', this.edit.bind(this, flick))

    return item
  }

edit(flick, ev) {
    const listItem = ev.target.closest('.flick')
    const nameField = listItem.querySelector('.flick-name')
    const btn = listItem.querySelector('.edit')

    const icon = btn.querySelector('i.fa')

    if (nameField.isContentEditable) {
      // make it no longer editable
      nameField.contentEditable = false
      icon.classList.remove('fa-check')
      icon.classList.add('fa-pencil')
      btn.classList.remove('success')

      // save changes
      flick.name = nameField.textContent
      this.save()
    } else {
      nameField.contentEditable = true
      nameField.focus()
      icon.classList.remove('fa-pencil')
      icon.classList.add('fa-check')
      btn.classList.add('success')
    }
  }

  saveOnEnter(flick, ev) {
    if (ev.key === 'Enter') {
      this.edit(flick, ev)
    }
  }
}

const app = new App({
  formSelector: '#flick-form',
  listSelector: '#flick-list',
  templateSelector: '.flick.template',
})