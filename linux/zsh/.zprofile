# Ibus
# export GTK_IM_MODULE=ibus
# export XMODIFIERS=@im=ibus
# export QT_IM_MODULE=ibus
# pidof ibus-daemon > /dev/null || ibus-daemon -drx

# Fcitx
# export XMODIFIERS=@im=fcitx

# >>> JVM installed by coursier >>>
export JAVA_HOME="/home/dyno/.cache/coursier/arc/https/github.com/adoptium/temurin17-binaries/releases/download/jdk-17.0.10%252B7/OpenJDK17U-jdk_x64_linux_hotspot_17.0.10_7.tar.gz/jdk-17.0.10+7"
export PATH="$PATH:/home/dyno/.cache/coursier/arc/https/github.com/adoptium/temurin17-binaries/releases/download/jdk-17.0.10%252B7/OpenJDK17U-jdk_x64_linux_hotspot_17.0.10_7.tar.gz/jdk-17.0.10+7/bin"
# <<< JVM installed by coursier <<<

# >>> coursier install directory >>>
export PATH="$PATH:/home/dyno/.local/share/coursier/bin"
# <<< coursier install directory <<<
