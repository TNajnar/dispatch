
export type TParkedVehicleDoc = {
    id: string
    nameRail: string,
    vehicles: TVehicleObject[],
}

export type TManageTrainDoc = {
    id: string,
    line: TLineObject[],
    locomotives: {locomotiveID: string},
    vehicles: TVehicleObject[],
}

export type TLineObject = {
    id: string,
    nameLine: string,
}

export type TVehicleObject = {
    id: string,
    spz: string,
    class: string,
}



