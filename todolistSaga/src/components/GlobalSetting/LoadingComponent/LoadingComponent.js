import React from 'react'
import { useSelector } from 'react-redux'
import styleLoading from './LoaddingComponent.module.css'
export default function LoadingComponent() {
    const { isLoading } = useSelector(state => state.LoadingReducer)
    if (isLoading) {
        return (
            <div className={styleLoading.bgLoading} >
                <img src='https://i.gifer.com/ZZ5H.gif' />
            </div>
        )
    }else {
        return '';
    }

}
