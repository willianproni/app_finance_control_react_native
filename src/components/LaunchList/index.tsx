import React from "react";
import { Release, TextRelease, ItemCheck } from "./styles";

export default function (props: any) {
    function GetReleaseId(props: any) {
        return props
    }

    return (
        <>
            <Release onPress={function () {
                const response = GetReleaseId(props.data)
                props.SendIdInformation(response)
            }}>
                <>
                    <TextRelease>{props.data.description}</TextRelease>
                    <ItemCheck check={props.data.confirmed} disabled={props.data.confirmed === true} onPress={function () {
                        const response = GetReleaseId(props.data.id)
                        props.SetIdCheckBoxModal(response);
                    }
                    }></ItemCheck>
                </>
            </Release>
        </>
    );
}