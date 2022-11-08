import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

const CardSkeleton: React.FC = () => { 
    return (
        <SkeletonTheme highlightColor="#dbdbdb" baseColor='#f0f0f0'>
            <div className='info-tag bg-light d-flex justify-content-center align-items-center color-primary'>
                <div className="info-tag__icon text-primary">
                    <Skeleton highlightColor="#dbdbdb" baseColor='#f0f0f0' />
                </div>
                <div className="info-tag__data">
                    <Skeleton count={2} />
                </div>
            </div>
        </SkeletonTheme>
    )
}

export default CardSkeleton
