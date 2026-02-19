library IEEE;
use IEEE.STD_LOGIC_1164.ALL;

entity Unitate_control is
  Port ( clk : in std_logic;
         reset:in std_logic;
         start:in std_logic;
         mode:in std_logic;
         ok:in std_logic;
         on_off:in std_logic;
         Ld_inc: out STD_LOGIC;
         En_inc: out STD_LOGIC;
         Ld_centrifugare : out STD_LOGIC;
         En_centrifugare : out STD_LOGIC; 
         Ld_clatire : out STD_LOGIC;
         En_clatire : out STD_LOGIC;
         Ld_spalare : out STD_LOGIC;
         En_spalare : out STD_LOGIC;
         Ld_total : out STD_LOGIC;
         En_total : out STD_LOGIC;
         FinCnt_centrifugare : in STD_LOGIC;
         FinCnt_clatire : in STD_LOGIC;
         FinCnt_inc : in STD_LOGIC;
         FinCnt_spalare : in STD_LOGIC;
         FinCnt_total : in STD_LOGIC;
         final_out : out STD_LOGIC;
         Astept_st:out STD_LOGIC;
         Alege_mod_st:out STD_LOGIC;
         Automat_st:out STD_LOGIC;
         Manual_st:out STD_LOGIC;
         Al_temp_st:out STD_LOGIC;
         Al_vit_st:out STD_LOGIC;
         Al_prespalare_st:out STD_LOGIC;
         Al_clatire_st:out STD_LOGIC;
         Confirmare_st:out STD_LOGIC;
         Incalzire_st:out STD_LOGIC;
         Spalare_st:out STD_LOGIC;
         Clatire_st:out STD_LOGIC;
         Centrifugare_st:out STD_LOGIC;
         Final_st:out STD_LOGIC);        
end Unitate_control;

architecture Behavioral of Unitate_control is

type stare_t is (astept, alege_mod, automat, manual, al_temp, al_vit, al_prespalare, al_clatire, confirmare,
incalzire, spalare, clatire, centrifugare, final);

signal stare, nx_stare : stare_t;
signal onoff : std_logic;
begin
act_stare : process(clk, reset)
begin
    if reset = '1' then stare <= astept;
    elsif rising_edge (clk) then stare <= nx_stare;
    end if;
end process;

tranzitii: process(reset,on_off, stare,start, mode, ok, FinCnt_centrifugare, FinCnt_clatire, 
FinCnt_inc,FinCnt_spalare)
begin
    
     case stare is
     when astept =>
      
           Ld_inc <= '1';
     En_inc<= '0';
     Ld_centrifugare <= '1';
     En_centrifugare <= '0';
     Ld_clatire <= '1';
     En_clatire <= '0';
     Ld_spalare <= '1';
     En_spalare <= '0';
     Ld_total <= '0';
     En_total <= '0';
      Confirmare_st <='0';
        Final_st <='0';
        Astept_st<='1';
        if on_off = '1' then nx_stare <= alege_mod;
                             Astept_st<='0';                   
        else nx_stare <= astept;
        end if;
        
    when alege_mod => 
         
         Alege_mod_st<='1';
         if mode = '1' and ok = '1' then nx_stare <= automat;
                                            Alege_mod_st<='0';
         elsif mode = '0' and ok = '1' then nx_stare <= manual;
                                            Alege_mod_st<='0';
         else nx_stare <= alege_mod;
         end if;
         
    when automat =>
        Automat_st<='1';
        if ok = '1' then nx_stare <= confirmare;
                          Automat_st<='0';
        else nx_stare <= automat;
        end if;
    
    when manual =>  
        Manual_st<='1';
        if ok = '1' then nx_stare <= al_temp;               
        else nx_stare <= manual;
        end if;
    
    when al_temp =>
        Manual_st<='0';
        Al_temp_st<='1';
        if ok = '1' then nx_stare <= al_vit;
                        
        else nx_stare <= al_temp;
        end if;
   
    when al_vit => 
        Al_temp_st<='0';
        Al_vit_st<='1';
        if ok = '1' then nx_stare <= al_prespalare;
                        
        else nx_stare <= al_vit;
        end if;
    
    when al_prespalare => 
        Al_vit_st<='0';
        Al_prespalare_st<='1';
        if ok = '1' then nx_stare <= al_clatire;
                        
        else nx_stare <= al_prespalare;
        end if;
    
    when al_clatire   =>
        Al_prespalare_st<='0'; 
        Al_clatire_st<='1';
        if ok = '1' then nx_stare <= confirmare;
                         
        else nx_stare <= al_clatire;
        end if;
     
     when confirmare => 
    Al_clatire_st<='0';
    Confirmare_st<='1';
    if start = '1' then 
        Ld_total <= '1';
        --en_total<='1';
        nx_stare <= incalzire;
    else
        nx_stare <= confirmare; 
    end if;
     when incalzire =>
     Ld_total <= '1';
        En_total <= '1'; 
        Incalzire_st<='1';
        En_inc <= '1';
        Ld_inc <= '0';
        if FinCnt_inc = '1' then 
            nx_stare <= spalare; 
             Incalzire_st <= '0';
        else nx_stare <= incalzire;
        end if;
     
     when spalare => 
        en_total<='1';
        Spalare_st<='1';
        En_spalare <= '1';
        Ld_spalare <= '0';
        if FinCnt_spalare = '1' then 
            nx_stare <= clatire;
            Spalare_st<='0';
        else nx_stare <= spalare;
        end if;
     
     when clatire =>
        En_total <= '1'; 
        Clatire_st<='1'; 
        En_clatire <= '1';
        Ld_clatire <= '0';
        if FinCnt_clatire = '1' then 
        nx_stare <= centrifugare;
        Clatire_st<='0'; 
        else nx_stare <= clatire;
        end if;
     
     when centrifugare => 
        En_total <= '1'; 
        Centrifugare_st<='1'; 
        En_centrifugare <= '1';
        Ld_centrifugare <= '0';
        if FinCnt_centrifugare = '1' then nx_stare <= final;Centrifugare_st<='0';
        else nx_stare <= centrifugare;
        end if;
     
     when final =>
        Final_st<='1'; 
        final_out <= '1'; 
        En_total <= '0'; 
        if FinCnt_total='1' and ok='1' then
            en_total<='0';
            nx_stare <= astept;
        else nx_stare <=final; 
        end if;
     when others => nx_stare <= astept;
                    Astept_st<='1';
                    Alege_mod_st<='0';
                    Automat_st<='0';
                    Manual_st<='0';
                    Manual_st<='0';
                    Al_vit_st<='0';
                    Al_prespalare_st<='0';
                    Al_clatire_st<='0';
                    Confirmare_st<='0';
                    Incalzire_st<='0';
                    Spalare_st<='0';
                    Clatire_st<='0';
                    Centrifugare_st<='0';  
                    Final_st<='0';
end case;

end process;

end Behavioral;
