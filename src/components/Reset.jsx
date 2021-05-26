import React, { useCallback, useState } from 'react'
import { withRouter } from 'react-router'
import { auth } from '../firebase/firebase'

const Reset = (props) => {
    const [email, setEmail] = useState('')
   const [error, setError] = useState(null)

   const processData = e =>{
    e.preventDefault()

    if(!email.trim()){
        setError('Ingrese Email')
        return
    }
setError(null)
recuperar()
}
const recuperar = useCallback(async()=>{
try {   
    await auth.sendPasswordResetEmail(email)
    props.history.push('/login')
    
} catch (error) {
    setError(error.message)
}


},[email, props.history])


    return (
        <div className="mt-5">
        <h3 className="text-center">Recuperar Contraseña</h3>
        <hr />
        <div className="row justify-content-center">
            <div className="col-12 col-sm-8 col-md-6 col-xl-4">
                <form onSubmit={processData} className='d-grid gap-2'>
                    {error && (
                        <div className="alert alert-danger">
                            {error}
                        </div>
                        )}
                    <input type="email" className="form-control mb-2" onChange={e=>setEmail(e.target.value)} value={email} placeholder='Ingrese un Email' />
                    <button className="btn btn-dark btn-lg" type='submit'>Reiniciar Contraseña</button>
                </form>
            </div>
        </div>
    </div>
    )
}

export default withRouter(Reset)
