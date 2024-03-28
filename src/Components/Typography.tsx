import React from 'react';
import { Text as RNText } from 'react-native';

export const Typography:React.FC<{
    color?:string,
    fontSize?:number,
    fontWeight?: "normal" | "bold" | "700" | "600" | "500",
    marginBottom?:number,
    children:React.ReactElement | any | React.ReactElement[]
}> = (props)=>{
    
    return (
        <RNText 
            style={{
                fontFamily: 'Noto sans',
                color: props.color ?? '#000',
                fontSize: props.fontSize ?? 16,
                fontWeight: props.fontWeight ?? 'normal',
                marginBottom: props.marginBottom ?? null,
            }}
            >
            {props.children}
        </RNText>
    )
}
