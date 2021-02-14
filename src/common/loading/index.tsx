import React from 'react';
import './loading.scss'

interface ILoadingState{
    isLoading:boolean
}
const Loading = (props:ILoadingState) => {
    return (
        <>
            {
                props.isLoading && (
                    <div className="lds-ellipsis">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                )
            }
        </>

    );
};

export default Loading;
