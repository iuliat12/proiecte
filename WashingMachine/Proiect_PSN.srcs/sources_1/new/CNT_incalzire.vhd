library IEEE;
use IEEE.STD_LOGIC_1164.ALL;
use IEEE.STD_LOGIC_unsigned.ALL;

entity CNT_incalzire is
    Port ( Data_inc : in STD_LOGIC_VECTOR (7 downto 0);
           Rst_inc : in STD_LOGIC;
           Ld_inc : in STD_LOGIC;
           En_inc : in STD_LOGIC;
           clk : in STD_LOGIC;
           Num_inc : out STD_LOGIC_VECTOR (7 downto 0);
           FinCnt_inc : out STD_LOGIC);
end CNT_incalzire;

architecture Behavioral of CNT_incalzire  is

signal cnt_inc : STD_LOGIC_VECTOR (7 downto 0);

begin

process(clk, Rst_inc)
begin
if Rst_inc = '1' then
    cnt_inc <= "00000000";
elsif rising_edge(clk) then
    if Ld_inc = '1' then
        cnt_inc <= Data_inc;
    elsif En_inc = '1' then
        cnt_inc <= cnt_inc - 1;
    end if;
end if;

end process;
Num_inc <= cnt_inc;

FinCnt_inc<='1' when cnt_inc="00000000" else '0';
end Behavioral;
