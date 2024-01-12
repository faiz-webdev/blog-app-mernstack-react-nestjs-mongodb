import React from 'react'
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';

function Mainlayout() {
    return (
        <><Header />
            <main>
                <section className='container'>
                    <Outlet />
                </section>
                <aside className='sidebar'>
                    <Sidebar />
                </aside>
            </main>
            <Footer />
        </>
    )
}

export default Mainlayout