const TaxConstant = 0.09
const LogTaxConstant = 0.05

function calFee(IntelCenterLvl = 0, Hideoutmanagement = 0, baseValue,fleaPrice){
    /*
    VO × Ti × 4PO × Q + VR × Tr × 4PR × Q
    Where:
    VO is the total value of the offer, calculated by multiplying the base price of the item times the amount (base price × total item count / Q). The Base Price is a predetermined value for each item.
    VR is the total value of the requirements, calculated by adding the product of each requirement base price by their amount.
    PO is a modifier calculated as log10(VO / VR).
    If VR is less than VO then PO is also raised to the power of 1.08.
    PR is a modifier calculated as log10(VR / VO).
    If VR is greater or equal to VO then PR is also raised to the power of 1.08.
    Q is the "quantity" factor which is either 1 when "Require for all items in offer" is checked or the amount of items being offered otherwise.
    Ti and Tr are tax constants; currently set to Ti = 0.035 and Tr = 0.06
    30% of this commission will be deducted if the player has constructed the level 3 Intelligence Center. This can be increased up to 45% with the Hideout management at level 50, each level giving 0.3% bonus.

    After this round the number, if it ends with a decimal point.
    */
    let baseFee
    let count = 1
    let commission = 0
    switch(IntelCenterLvl){
        case 0:
            commission = 0
            break
        case 1:
            commission = 0
            break
        case 2:
            commission = 0
            break
        case 3:
            commission = 30
            commission += (commission / 100) * Hideoutmanagement
            break
        default:
            commission = 0
            break
    }
    if (fleaPrice >= baseValue)
    {
        baseFee = (baseValue * TaxConstant * Math.pow(4, Math.log10(baseValue / fleaPrice)) * count) + (fleaPrice * TaxConstant * Math.pow(4, Math.pow(Math.log10(fleaPrice / baseValue), LogTaxConstant)) * count)
    }
    else
    {
        baseFee = (baseValue * TaxConstant * Math.pow(4, Math.pow(Math.log10(baseValue / fleaPrice), LogTaxConstant)) * count) + (fleaPrice * TaxConstant * Math.pow(4, Math.log10(fleaPrice / baseValue)) * count)
    }
    return Math.round(baseFee - ((baseFee * commission) / 100))
}

export default calFee