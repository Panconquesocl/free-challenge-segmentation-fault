function Login(){
    const nombres = [
        "Alejandro", "Valentina", "Santiago", "Isabella", "Matías", "Camila", "Benjamín", "María", "Gabriel", "Antonia",
        "Diego", "Florencia", "Lucas", "Catalina", "Tomás", "Sara", "Joaquín", "Emma", "Ignacio", "Martina",
        "Sebastián", "Agustina", "Nicolás", "Amelia", "Juan", "Victoria", "Felipe", "Renata", "Andrés", "Lucía",
        "Pablo", "Mía", "Emiliano", "Sofía", "Cristóbal", "Paula", "José", "Camila", "Diego", "Gabriela",
        "Martín", "Julieta", "Alonso", "Antonella", "Hugo", "Valeria", "Damián", "Nicole", "Emilio", "Carla",
        "Leandro", "Manuela", "Ezequiel", "Mariana", "Javier", "Agustín", "Francisco", "Ana", "Ricardo", "Renata",
        "Víctor", "Bianca", "Fernando", "Elena", "Marco", "Juliana", "Esteban", "Isabel", "Maximiliano", "Florencia",
        "Alejo", "Mónica", "Gonzalo", "Paola", "Rafael", "Victoria", "Bruno", "Camila", "Samuel", "Daniela",
        "Tommy", "Gabriela", "Emerson", "Lorena", "Adrián", "Carolina", "Kevin", "Natalia", "Axel", "Jimena",
        "Mauricio", "Sabrina", "Alfredo", "Valentina", "Ricardo", "Elisa", "Luis", "Angélica", "Óscar", "Gabriela"
      ];

    return(
    <>
        <div>
            <h1>Login</h1>
            <form action="">
                <label htmlFor="">Nombre</label>
                <select name="" id="">
                {nombres.map((nombre)=>(<option value ={nombre} id="">{nombre}</option>))}
                </select>
                <br />
                <label htmlFor="">Apellido</label>
                <input type="text"/>
                <br />
                <label htmlFor="">Email</label>
                <input type="email" />
                <br />
                <label htmlFor="">Contrasena</label>
                <input type="password"/>
                <br />
                <label htmlFor="">Fecha de Nacimiento</label>
                <input type="datetime-local" />
                <br />
               
                <input type="submit" />
            </form>
        </div>
    </>
    )
}
export default Login;