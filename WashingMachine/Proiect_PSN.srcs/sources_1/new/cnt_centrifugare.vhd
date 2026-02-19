library IEEE;
use IEEE.STD_LOGIC_1164.ALL;
use IEEE.STD_LOGIC_unsigned.ALL;

entity CNT_centrifugare is
    Port ( Rst_centrifugare: in STD_LOGIC;
           Ld_centrifugare : in STD_LOGIC;
           En_centrifugare : in STD_LOGIC;
           clk : in STD_LOGIC;
           Num_centrifugare: out STD_LOGIC_VECTOR (4 downto 0);
           FinCnt_centrifugare : out STD_LOGIC);
end CNT_centrifugare;

architecture Behavioral of CNT_centrifugare  is

signal cnt_centrifugare : STD_LOGIC_VECTOR (4 downto 0);

begin

process(clk, Rst_centrifugare)
begin
if Rst_centrifugare = '1' then
    cnt_centrifugare <= "00000";
elsif rising_edge (clk) then
    if Ld_centrifugare = '1' then
        cnt_centrifugare <= "10100";
    elsif En_centrifugare = '1' then
        cnt_centrifugare<= cnt_centrifugare - 1;
    end if;
end if;

end process;
Num_centrifugare <= cnt_centrifugare;

FinCnt_centrifugare<='1' when cnt_centrifugare="0000" else '0';
end Behavioral;
