


library IEEE;
use IEEE.STD_LOGIC_1164.ALL;
use IEEE.STD_LOGIC_unsigned.ALL;
use IEEE.STD_LOGIC_arith.ALL;

entity CNT_total is
    Port ( Data_total : in STD_LOGIC_VECTOR (7 downto 0);
           Rst_total : in STD_LOGIC;
           Ld_total : in STD_LOGIC;
           En_total : in STD_LOGIC;
           clk : in STD_LOGIC;
           Num_total : out STD_LOGIC_VECTOR (7 downto 0);
           FinCnt_total : out STD_LOGIC);
end CNT_total;

architecture Behavioral of CNT_total  is

signal cnt_total : STD_LOGIC_VECTOR (7 downto 0);

begin

process(clk, Rst_total)
begin
if Ld_total = '1' then
        cnt_total <= Data_total;
end if;
if Rst_total = '1' then
    cnt_total <= "00000000"; 
elsif En_total = '1' then
    if rising_edge (clk) then
        cnt_total <= cnt_total - 1;
    end if;
end if;

end process;

FinCnt_total<='1' when cnt_total="00000000" else '0';

num_total<= cnt_total;

end Behavioral;
