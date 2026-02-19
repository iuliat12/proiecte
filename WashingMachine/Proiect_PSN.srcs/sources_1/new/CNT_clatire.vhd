library IEEE;
use IEEE.STD_LOGIC_1164.ALL;
use IEEE.STD_LOGIC_unsigned.ALL;

entity CNT_clatire is
    Port ( Data_clatire : in STD_LOGIC_VECTOR (7 downto 0);
           Rst_clatire : in STD_LOGIC;
           Ld_clatire : in STD_LOGIC;
           En_clatire : in STD_LOGIC;
           clk : in STD_LOGIC;
           Num_clatire : out STD_LOGIC_VECTOR (7 downto 0);
           FinCnt_clatire : out STD_LOGIC);
end CNT_clatire;

architecture Behavioral of CNT_clatire is

signal cnt_clatire : STD_LOGIC_VECTOR (7 downto 0);

begin

process(clk, Rst_clatire)
begin
if Rst_clatire = '1' then
    cnt_clatire <= "00000000";
elsif rising_edge(clk) then
    if Ld_clatire = '1' then
        cnt_clatire <= Data_clatire;
    elsif En_clatire = '1' then
        cnt_clatire <= cnt_clatire - 1;
    end if;
end if;

end process;
Num_clatire <= cnt_clatire;

FinCnt_clatire<='1' when cnt_clatire="00000000" else '0';

end Behavioral;
