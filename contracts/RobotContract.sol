// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;
import "./Robot_Token.sol";

contract RobotContract {

    string  public name = "Robot Contract";
     bytes32 public robotname;
     uint32 public weight;
     uint32 public height;


    struct Engineer {
        bool permission;  // if true, allows address to modify robot
    }

    address private owner; // contract owner

     mapping(address => Engineer) public engineers;

    constructor(){
        owner = msg.sender;
        robotname = "New Robot";
        weight = 0;
        height = 0;
    }

    
    modifier isOwner() {
        require(
            msg.sender == owner,
            "You must be the owner to perform this action"
        );
        _;
    }

    function GivePermission(address identifier)  public isOwner
         returns(bytes32 message)
    {
        
        if(engineers[identifier].permission == true){
            return "Engineer already had permission";
        }
        else{
            engineers[identifier].permission = true;
            return "Permission Granted";
        }
    }

      function RevokePermission(address identifier)  public isOwner
         returns(bytes32 message)
    {
        
        if(engineers[identifier].permission == false){
            return "Address is not an engineer";
        }
        else{
            engineers[identifier].permission = true;
            return "Permission Revoked";
        }
    }

    function ResetRobot() public isOwner{
        robotname = "Spare Parts";
        weight = 0;
        height = 0;
    }

    function GetName() public  view returns (bytes32 robot){
        return robotname;
    }
    
   

    function ModifyRobot(bytes32 n, uint32 h , uint32 w) public 
        returns(bytes32 message)
    {
        address person = msg.sender;
        require(engineers[person].permission == true , "Person is not an engineer");

        robotname = n;
        height = h;
        weight = w;

        
        return "Success - 1 token earned";

    }
    
    
}