//create <header> 
const header=document.createElement('header');
//append header element into body
document.body.appendChild(header);
//create <h1> for header
// const h1=document.createElement('h1');
//text content for h1
// h1.textContent="TV SHOW";
//append h1 to header
// header.appendChild(h1);
//create <select>
const select=document.createElement('select');
//default value == "all Epesode " for select
const defaultValueSelect=document.createElement('option');
defaultValueSelect.textContent="All Epesode";
defaultValueSelect.selected=true;
select.appendChild(defaultValueSelect);
//append select into header
header.appendChild(select);
//create form 
const form=document.createElement('form');
//set attribute id for form
form.setAttribute('id','searchForm')
//append form into header
header.appendChild(form);
//create <input> 
const input=document.createElement('input');
//set attribute type of input
input.setAttribute('type','text');
input.style.width="70%";
input.style.height="30px";

input.setAttribute('name','query')
//set attribute type of input
input.setAttribute('placeholder',`Search`)
//set attribute id for input
input.setAttribute('id','searchbox');
//input appendchild into header
form.appendChild(input);
   //create main element:
   const main=document.createElement('main');
   //add class container-grid to main
//    main.classList.add('container-grid');
//   //create Unorder list and append it in the main 
//   const ul=document.createElement('ul');
  main.classList.add('container-grid')
//   main.append(ul);
   document.body.appendChild(main);
/*============================================================== */
/* get data with fetch*/
const fetchMovies=async()=>{
    try{
        const response=await fetch('https://api.tvmaze.com/shows/82/episodes');
        const data=await response.json();
        return data;
    }catch(error){
console.log(error);
    }
}
//load data in page
fetchMovies().then(data =>{
    console.log(data);
   for(let el of data){
       showTv(el);
   }  
});
console.log(fetchMovies())
function showTv(el){    
            const section=document.createElement('section');
            main.appendChild(section);
            section.classList.add('film')
            // main.appendChild(section);
           
            const img=document.createElement('img');
            img.setAttribute('src',el.image.medium);
            console.log(el.image.origin)
            section.appendChild(img);
            img.classList.add('image');
            const summary=el.summary.substring(el.summary.indexOf(' '),el.summary.indexOf('.'));
            
            const pragraphSummary=document.createElement('p');
            pragraphSummary.textContent=summary;
            //add class to paragraphSummary
            pragraphSummary.classList.add('pragraphSummary');
            section.appendChild(pragraphSummary);

            //add name movie
            const nameMovie=document.createElement('p');
            nameMovie.classList.add('nameMovie');
            nameMovie.textContent=`${el.name}`;
            nameMovie.style.textAlign='center';
            nameMovie.style.fontSize='20px';
            nameMovie.classList.add('name');
            section.appendChild(nameMovie);//append name of movie into section
            //add summary
                   //create option for season and number of Epesode and name 
        const option=document.createElement('option');
        option.value=el.id;
        option.textContent=`S0${el.season}E0${el.number}-${el.name}`;
        select.appendChild(option);
        //add url 
        const linkMovie=document.createElement('a');
        linkMovie.setAttribute('href',el.url);
        linkMovie.innerHTML=`<i class="fa fa-play-circle-o"></i>`;
        section.appendChild(linkMovie);
        //show time for any episode
        const showTime=document.createElement('a');
        showTime.innerHTML=`<i class="fa fa-clock-o"></i>`;
       showTime.href="#";
       showTime.addEventListener('mouseover',()=>{
           showTime.textContent=el.runtime + "minutes";
           showTime.style.fontSize="20px";
           showTime.style.color="purple";

       })
       showTime.addEventListener('mouseleave',()=>{
        showTime.innerHTML=`<i class="fa fa-clock-o"></i>`;
        showTime.style.fontSize="48px";
        showTime.style.color="red";
    })
        section.appendChild(showTime);
    
}

//addeventlistener for form
form.addEventListener ('keyup', async e =>
{
    e.preventDefault();
main.textContent="";
    const searchTerm = form.elements.query.value;
    fetchMovies().then(data =>{

        for(let el of data){
            if((el.name).includes(searchTerm) || (el.summary).includes(searchTerm)){
                console.log(el)
                // main.textContent="";
                showTv(el);
            }
           }
         
       })
   
});
//add eventlistener click for select
select.addEventListener ('click', async e =>
{
    e.preventDefault();
   
    fetchMovies().then(data =>{

     for(let el of data){
         if(el.id==select.value){
             main.textContent="";
             showTv(el);
         }
        }
      
    })
   
});


