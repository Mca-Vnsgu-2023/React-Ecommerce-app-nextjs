import React from 'react'
import { Oval } from 'react-loader-spinner'
import styles from './loader.styles.module.scss'

const Loader = () => {
    return (
        <div className={styles.loaderWrap}>
            <Oval
                height="50"
                width="50"
                color="#232323"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel='oval-loading'
                secondaryColor="#131313"
                strokeWidth={5}
                strokeWidthSecondary={5}
            />
        </div>
    )
}

export default Loader