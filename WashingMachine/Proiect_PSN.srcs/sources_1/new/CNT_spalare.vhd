library IEEE;
use IEEE.STD_LOGIC_1164.ALL;
use IEEE.STD_LOGIC_unsigned.ALL;

entity CNT_spalare is
    Port ( Data_spalare: in STD_LOGIC_VECTOR (7 downto 0);
           Rst_spalare: in STD_LOGIC;
           Ld_spalare : in STD_LOGIC;
           En_spalare : in STD_LOGIC;
           clk : in STD_LOGIC;
           Num_spalare : out STD_LOGIC_VECTOR (7 downto 0);
           FinCnt_spalare : out STD_LOGIC);
end CNT_spalare;

architecture Behavioral of CNT_spalare  is

signal cnt_spalare : STD_LOGIC_VECTOR (7 downto 0);

begin

process(clk, Rst_spalare)
begin
if Rst_spalare = '1' then
    cnt_spalare <= "00000000";
elsif rising_edge(clk) then
    if Ld_spalare = '1' then
        cnt_spalare <= Data_spalare;
    elsif En_spalare = '1' then
        cnt_spalare<= cnt_spalare - 1;
    end if;
end if;

end process;
Num_spalare <= cnt_spalare;

FinCnt_spalare<='1' when cnt_spalare="00000000" else '0';
end Behavioral;
