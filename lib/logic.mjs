const TaxConstant = 0.09;
const LogTaxConstant = 0.05;

function calFee(IntelCenterLvl = 0, Hideoutmanagement = 0, item,fleaPrice){
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
    Ti and Tr are tax constants currently set to 0.05.
    30% of this commission will be deducted if the player has constructed the level 3 Intelligence Center.

    After this round the number, if it ends with a decimal point.
    */
    const commission = 1;
    let baseFee;
    if (fleaPrice >= item.BaseValue)
    {
        baseFee = (item.BaseValue * TaxConstant * Math.Pow(4, Math.Log10(item.BaseValue / fleaPrice)) * Count) + (fleaPrice * TaxConstant * Math.Pow(4, Math.Pow(Math.Log10(fleaPrice / item.BaseValue), LogTaxConstant)) * Count);
    }
    else
    {
        baseFee = (item.BaseValue * TaxConstant * Math.Pow(4, Math.Pow(Math.Log10(item.BaseValue / fleaPrice), LogTaxConstant)) * Count) + (fleaPrice * TaxConstant * Math.Pow(4, Math.Log10(fleaPrice / item.BaseValue)) * Count);
    }
    return Math.Round(baseFee - ((baseFee * commission) / 100));
}

export default calFee;