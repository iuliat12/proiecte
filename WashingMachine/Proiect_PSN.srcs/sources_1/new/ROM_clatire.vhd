library IEEE;
use IEEE.STD_LOGIC_1164.ALL;
use IEEE.STD_LOGIC_arith.ALL;

entity ROM_clatire is
 Port ( Addr_clatire : in std_logic;
        Data_clatire : out std_logic_vector(7 downto 0));
end ROM_clatire;

architecture Behavioral of ROM_clatire is

type ROM_vector is array(1 downto 0) of std_logic_vector(7 downto 0);
signal ROM_clatire :  ROM_vector := (
1=>"00010100",
0=> "00001010");
begin

Data_clatire <= ROM_clatire(conv_integer(Addr_clatire));
end Behavioral;
