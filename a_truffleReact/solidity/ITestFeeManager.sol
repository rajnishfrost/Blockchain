// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

/**
 * @title ITestFeeManager
 * @author https://github.com/chirag-bgh
 */
interface ITestFeeManager {
    /**
     * @dev Emitted when the `testFeeAddress` is changed.
     */
    event TestFeeAddressSet(address testFeeAddress);

    /**
     * @dev Emitted when the `platformFeeBPS` is changed.
     */
    event PlatformFeeSet(uint16 platformFeeBPS);

    /**
     * @dev The new `testFeeAddress` must not be address(0).
     */
    error InvalidTestFeeAddress();

    /**
     * @dev The platform fee numerator must not exceed `_MAX_BPS`.
     */
    error InvalidPlatformFeeBPS();

    /**
     * @dev Sets the `testFeeAddress`.
     *
     * Calling conditions:
     * - The caller must be the owner of the contract.
     *
     * @param testFeeAddress_ The test fee address.
     */
    function setTestFeeAddress(address testFeeAddress_) external;

    /**
     * @dev Sets the `platformFeePBS`.
     *
     * Calling conditions:
     * - The caller must be the owner of the contract.
     *
     * @param platformFeeBPS_ Platform fee amount in bps (basis points).
     */
    function setPlatformFeeBPS(uint16 platformFeeBPS_) external;

    /**
    
     */

    function getTestFeeManager() external view returns (address);

    /**
     * @dev The protocol's address that receives platform fees.
     * @return The configured value.
     */
    function testFeeAddress() external view returns (address);

    /**
     * @dev The numerator of the platform fee.
     * @return The configured value.
     */
    function platformFeeBPS() external view returns (uint16);

    /**
     * @dev The platform fee for `requiredEtherValue`.
     * @param requiredEtherValue The required Ether value for payment.
     * @return fee The computed value.
     */
    function platformFee(uint128 requiredEtherValue)
        external
        view
        returns (uint128 fee);
}
