export function toggleTheme(){
    let currentTheme = localStorage.getItem("dark");
    if(currentTheme == 'active'){
        dark();
    }
    currentTheme != 'active' ? dark() : light();
}
export function loadTheme(){
    const isDark = localStorage.getItem("dark") === "active";
    if(isDark){
        dark();
    }
}
// liga darkmode
function dark(){
    document.body.classList.add('dark');
    localStorage.setItem("dark", 'active');
}
// volta pro lightmode
function light(){
    document.body.classList.remove("dark");
    localStorage.setItem("dark", null);
}
// quando atualizar o site, garante q o darkmode irá ligar