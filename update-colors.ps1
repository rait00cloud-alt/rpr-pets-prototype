# Script para adaptar cores da Legend 360 para Bellic World

$colorReplacements = @{
    # Roxo Legend -> Preto Tático
    "#7614b7" = "#0F0F0F"
    "bg-\[#7614b7\]" = "bg-[#0F0F0F]"
    "text-\[#7614b7\]" = "text-[#F2F2F2]"
    
    # Laranja Legend -> Bege Militar
    "#f4a312" = "#C4A574"
    "bg-\[#f4a312\]" = "bg-[#C4A574]"
    "text-\[#f4a312\]" = "text-[#C4A574]"
    
    # Azul Legend -> Vermelho Tático
    "#3690c6" = "#C62828"
    "bg-blue-500" = "bg-[#C62828]"
    "text-blue-500" = "text-[#C62828]"
    "hover:text-blue-500" = "hover:text-[#C62828]"
    
    # Backgrounds pretos
    "bg-black" = "bg-[#0F0F0F]"
    "bg-black/40" = "bg-[#0F0F0F]/40"
    "bg-black/70" = "bg-[#0F0F0F]/70"
    
    # Textos brancos
    "text-white" = "text-[#F2F2F2]"
    
    # Borders
    "border-white" = "border-[#F2F2F2]"
    
    # Logo references
    "logo-legend-360" = "belic-01"
    "legend.brasil" = "belicworld"
    "legend360.com.br" = "belicworld.com.br"
    "Legend360" = "Bellic World"
    "Legend 360" = "Bellic World"
    "LEGEND" = "BELLIC"
}

$files = Get-ChildItem -Path ".\src" -Include *.tsx,*.astro,*.ts,*.jsx,*.js,*.css -Recurse

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    $modified = $false
    
    foreach ($key in $colorReplacements.Keys) {
        if ($content -match [regex]::Escape($key)) {
            $content = $content -replace [regex]::Escape($key), $colorReplacements[$key]
            $modified = $true
        }
    }
    
    if ($modified) {
        Set-Content -Path $file.FullName -Value $content -NoNewline
        Write-Host "Atualizado: $($file.FullName)"
    }
}

Write-Host "`nConcluído! Todas as cores foram adaptadas para Bellic World."
