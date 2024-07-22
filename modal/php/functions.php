function my_scripts_method() {
        // модельное окно
        wp_enqueue_script( 'mod-scripts', get_template_directory_uri() . './modal/js/classie.js', array(), null, true);
        wp_enqueue_script( 'modef-scripts', get_template_directory_uri() . './modal/js/modalEffects.js', array(), null, true);
        
}
add_action( 'wp_enqueue_scripts', 'my_scripts_method' );
/* стили модального окна */
function wpdocs_theme_name_scripts() {
    wp_enqueue_style( 'style-mod', get_template_directory_uri() . './modal/css/component.css');
}
add_action( 'wp_enqueue_scripts', 'wpdocs_theme_name_scripts' );