

const getReservationState = (checkIn:Date, checkOut:Date) =>{
    const now = new Date();
    if (now <checkIn && now < checkOut){
        return 'pending'
    }
    else if (now > checkIn) {
        if (now > checkOut) {
            return 'expired'
        } else if (now >= checkIn && now <= checkOut) {
            return 'active'
        }
    } else if (now >= checkIn && now <= checkOut) {
        return 'active'
    }
}

export {getReservationState}