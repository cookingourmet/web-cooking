// Array
const frameworks = [
    {
        name:"MODULO I Inicio de Clases ", 
        description:"13 De Enero 2023"
    },
    {
        name:"Fin de las Clases", 
        description:"Viernes 07 De Abril 2023"
    },
    {
        name:"Envio de Registros", 
        description:"Los docentes envian sus registros el 8 de Abril"
        
    },
    {
        name:"Examenes Sustitutorios", 
        description:"Lunes 10 y Martes 11 de Abril (No hay otra fecha para dar examenes)"
    },
    {
        name:"Archivar Cursos", 
        description:"Miercoles 12 de abril. El área academica archiva los cursos y ya no se admiten modificación "
    },  
    {
        name:"Matricula Regular MODULO II ", 
        description:"jueves 13, al sábado 15 de abril "
    },
    {
        name:"Matricula Extemporanea", 
        description:"Lunes 17 de abril hasta el sabado 22 de abril"
    },
    {
        name:"MODULO II Inicio de Clases", 
        description:"Lunes 17 de abril"
    },
    {
        name:"Fin de las Clases", 
        description:"Viernes 30 de junio"
    },
    {
        name:"Envio de Registros", 
        description:"Los docentes envian sus registros el 1 de julio"
    },
    {
        name:"Examenes Sustitutorios", 
        description:"Lunes 03 y Martes 04 de Julio (No hay otra fecha para dar examenes)"
    },
    {
        name:"Archivar Cursos", 
        description:"Miercoles 05 de Julio. El área academica archica los cursos y ya no se admiten modificación"
    },
    {
        name:"Matricula Regular MODULO III ", 
        description:"jueves 06, al sábado 08 de julio"
    },
    {
        name:"Matricula Extemporanea", 
        description:"Lunes 10 de julio hasta el sábado 15 de julio"
    },
    {
        name:"MODULO III Inicio de Clases", 
        description:"Lunes 10 de julio"
    },
    {
        name:"Fin de las Clases", 
        description:"Viernes 29 de Setiembre"
    },
    {
        name:"Envio de Registros", 
        description:"Los docentes envian sus registros el sábado 30 de Setiembre"
    },
    {
        name:"Examenes Sustitutorios", 
        description:"Lunes 02 y Martes 03 de Octubre (No hay otra fecha para dar examenes)"
    },
    {
        name:"Archivar Cursos", 
        description:"Miercoles 04 de octubre. El área academica archica los cursos y ya no se admiten modificación"
    },
    {
        name:"Matricula Regular MODULO IV", 
        description:"jueves 05, al sábado 07 de octubre"
    },
    {
        name:"Matricula Extemporanea", 
        description:"Lunes 09 de octubre hasta el sábado 14 de octubre"
    },
    {
        name:"MODULO IV Inicio de Clases", 
        description:"Lunes 09 de octubre"
    },
    {
        name:"Fin de las Clases", 
        description:"Viernes 29 de Diciembre"
    },
    {
        name:"Envio de Registros", 
        description:"Los docentes envian sus registros el sábado 30 de Diciembre"
    },
    {
        name:"Examenes Sustitutorios", 
        description:"Lunes 01 y Martes 02 de Enero 2024 (No hay otra fecha para dar examenes)"
    },
    {
        name:"Archivar Cursos", 
        description:"Miercoles 03 de Enero 2024. El área academica archica los cursos y ya no se admiten modificación"
    },
    {
        name:"Matricula Regular MODULO V", 
        description:"jueves 04, al sábado 06 de enero 2024"
    },
    {
        name:"Matricula Extemporanea", 
        description:"Lunes 08 de enero hasta el sábado 13 de enero"
    },
    {
        name:"MODULO V Inicio de Clases", 
        description:"Lunes 08 de enero 2024"
    },
    {
        name:"Fin de las Clases", 
        description:"Viernes 29 de Marzo"
    },
    {
        name:"Envio de Registros", 
        description:"Los docentes envian sus registros el sábado 30 de Marzo"
    },
    {
        name:"Examen Sustitutorio", 
        description:"Lunes 01 y Martes 02 de Abril 2024 (No hay otra fecha para dar examenes)"
    },
    {
        name:"Archivar Cursos", 
        description:"Miercoles 03 de Abril 2024. El área academica archiva los cursos y ya no se admiten modificación"
    },
    {
        name:"Matricula Regular MODULO VI", 
        description:"jueves 04, al sábado 06 de Abril 2024"
    },
    {
        name:"Matricula Extemporanea", 
        description:"Lunes 08 de abril hasta el sábado 13 de Abril"
    },
    {
        name:"MODULO VI Inicio de Clases", 
        description:"Lunes 08 de abril 2024"
    },
    {
        name:"Fin de las Clases", 
        description:"Viernes 28 de junio"
    },
    {
        name:"Envio de Registros", 
        description:"Los docentes envian sus registros el sábado 39 de junio"
    },
    {
        name:"Examen Sustitutorio", 
        description:"Lunes 01 y Martes 02 de Julio 2024 (No hay otra fecha para dar examenes)"
    },
    {
        name:"Archivar Cursos", 
        description:"Miercoles 03 de Julio 2024. El área academica archiva los cursos y ya no se admiten modificación"
    },
    {
        name:"FIN DE LAS CLASES", 
        description:"Puedes Tramitar tu Diploma de Egresado"
    },
    {
        name:"ATENCIÓN", 
        description:"Comunicate con el Area Academica para todos los beneficions que puedes obtener cuando culmines tu carrera"
    },
    {
        name:"Cooking Gourmet", 
        description:"Los Mejores en Gastronomía"
    },
    {
        name:"FIN", 
        description:"Fin"
    },
    {
        name:"FIN", 
        description:"Fin"
    },
]

// render html
var html = "";
frameworks.forEach(e=>{
    html +="<div class='child'><div class='content'><h4>"+e.name+"</h4><p>"+e.description+"</p></div> </div>"
})
timeline.innerHTML = html

// ANIMACION TIMELINE

var _items = document.querySelectorAll(".child")
_items.forEach(element =>{
    if(element.offsetTop < 300)
        element.classList.add('_show')
})

window.addEventListener("scroll",e=>{
    var scroll = document.documentElement.scrollTop
    var items = document.querySelectorAll(".child")
    items.forEach(elem=>{
        if(elem.offsetTop - window.innerHeight/2 < scroll){
            elem.classList.remove('_hide')
            elem.classList.add('_show')
        }else{
            elem.classList.remove('_show')
            elem.classList.add('_hide')
        }

    })
})