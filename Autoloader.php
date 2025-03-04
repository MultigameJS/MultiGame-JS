<?php

namespace App;

class Autoloader 
{
    /**
     * Register the autoload function queue
     *
     * Registers the Composer autoloader and adds the custom autoloader function.
     *
     * @return void
     */
    static function register()
    {
        // Register Composer's autoload
        require_once __DIR__ . '/vendor/autoload.php';

        // Register the custom autoloader function
        spl_autoload_register([
            __CLASS__,
            'Autoload'
        ]);
    }

    /**
     * Custom autoloader function
     *
     * Automatically loads the class file when a class is instantiated.
     *
     * @param string $class The fully qualified name of the class to load.
     * @return void
     */
    static function Autoload($class)
    {
        // Only autoload classes from the current namespace
        if (strpos($class, __NAMESPACE__) === 0) {
            // Remove the 'App\' prefix from the class name
            $class = str_replace(__NAMESPACE__ . '\\', '', $class);
            
            // Replace namespace separators with directory separators
            $class = str_replace('\\', '/', $class);

            // Build the full path to the class file
            $file = __DIR__ . '/' . $class . '.php';

            // Import the file if it exists
            if (file_exists($file)) {
                require_once $file;
            } else {
                // Log an error if the file doesn't exist
                error_log("Autoloader error: Unable to load file: $file");
            }
        }
    }
}