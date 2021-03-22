import React from 'react'
import { colors, img } from '../../assets/constants/constant';

const AppSkeleton = props => {
    return (
        <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'stretch'
        }}>
            <div style={{
                height: '60px',
                backgroundColor: colors.black,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                padding: '0 10px'
            }}>
                <img 
                    src={img.logo}
                    alt="Famly Tree"
                    style={{
                        height: '44px'
                    }}
                />
            </div>
            <div style={{
                height: 'calc(100vh - 110px)',
                backgroundColor: colors.bgColor,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'stretch',
                overflow: 'scroll'
            }}>{props.children}</div>
            <div style={{
                height: '50px',
                backgroundColor: colors.primaryTextColor,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'stretch'
            }}>
                <div style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <img.user 
                        fill={props.selected === "User"?colors.primaryColor:colors.bgColor} 
                        height="30px" 
                        width="30px"
                    />
                </div>
                <div style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <img.home 
                        fill={props.selected === "Home"?colors.primaryColor:colors.bgColor} 
                        height="30px" 
                        width="30px"
                    />
                </div>
                <div style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <img.bell 
                        fill={props.selected === "Bell"?colors.primaryColor:colors.bgColor} 
                        height="30px" 
                        width="30px"
                    />
                </div>
            </div>
        </div>
    )
}

export default AppSkeleton