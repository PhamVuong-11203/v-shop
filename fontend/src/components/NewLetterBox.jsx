import React from 'react'

const NewLetterBox = () => {
    const handleSubmit = (e) =>{
        e.preventDefaut()
    }
    return (
        <div className='text-center py-5 mt-20'>
            <p className='text-2xl text-gray-800 font-medium'>Subscribe now & get 20% off</p>
            <p className='text-gray-400 mt-3'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
            <form onSubmit={handleSubmit} action="" className='flex items-center w-full sm:w-1/2 mx-auto my-6 border pl-3'>
                <input type="email" placeholder='Enter your email'
                    className='w-full outline-none sm:flex-1' required
                />
                <button type='submit' className='bg-black text-white text-xs px-10 py-4'> SUBSCRIBE </button>
            </form>
        </div>
    )
}

export default NewLetterBox
