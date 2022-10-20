export interface iGetAttributePayload {
    access_token: string
    user_id: string | number
}

export interface iCreateChildAttrPayload {
    parent_id: number | string;
    term_name: string,
    access_token: string
}

export interface iCreateAttributePayload {
    user_id: number,
    access_token: string
    label_name: string,
}

export interface iUpdateChildAttribute{
    id_term: number,
    parent_id: number | string,
    new_attribute_term_name: string,
    access_token: string;
}

export interface iUpdateAttr {
    old_attribute_name: string,
    new_attribute_name: string,
    access_token: string
}