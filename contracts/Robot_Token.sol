
// SPDX-License-Identifier: GPL-3.0
 
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Robot_Token is ERC20{

    uint256 public TokenSupply = 100000000;

    constructor() ERC20("Robot_Token" , "RBT"){
        decimals();
        _mint(msg.sender, TokenSupply);
    }

    function decimals() public view virtual override returns(uint8){
        return 0;
    }

       

}