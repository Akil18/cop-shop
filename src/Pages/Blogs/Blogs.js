import React from 'react';

const Blogs = () => {
    return (
        <div>
            <h2 className='text-3xl text-center font-semibold my-8'>Blogs</h2>

            <div className='lg:mx-20 mb-8 p-8 border-2'>
                <h3 className='text-lg font-semibold'>What are the different ways to manage a state in a React application?</h3>
                <p className='my-4'>States can be managed using locally using useState Hook and changed using the setState() function. The values of the state can be passed on to children by prop drilling however a better way to manage state globally is to use React Context API and placing providers on the highest component under which its children can manipulate the state.</p>

                <h3 className='text-lg font-semibold'> How does prototypical inheritance work?</h3>
                <p className='my-4'>When an object inherits another it has access to all the properties and methods in the other object. It can make use of those and can create new ones of its own which only it has access to.</p>
                
                <h3 className='text-lg font-semibold'>What is a unit test? Why should we write unit tests?</h3>
                <p className='my-4'>A unit test is a way of testing written code seperately before adding it to the overall main production. Unit testing helps to detect early flaws in code and correct them beforehand.</p>
                
                <h3 className='text-lg font-semibold'>React vs. Angular vs. Vue</h3>
                <p className='my-4'>React has a component-based approach while Angular has a modular development structure and Vue follows template-based syntax. Both React and Vue makes use of a virtual DOM and code is written in JavaScript while Angular does not use a vitual DOM and uses Typrscript as its language.</p>
            </div>
        </div>
    );
};

export default Blogs;