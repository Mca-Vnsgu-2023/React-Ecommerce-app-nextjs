import React, { Fragment } from 'react'
import Header from './Header'
import Footer from './Footer'
import Banner from './Banner'
import { useSelector } from '@/Store/Store'


interface IProps {
    children: React.ReactNode,
}

function MainLayout({ children }: IProps) {

    const { themeMode } = useSelector((state: any) => state.theme)

    return (
            <div className={`${themeMode}`}>
                <Fragment>
                    <Banner />
                    <Header />
                    <div style={{marginTop: '123px'}}>
                        {children}
                    </div>
                    <Footer />
                </Fragment>
            </div>
      

    )
}

export default MainLayout