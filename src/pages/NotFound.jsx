import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <div class="gradient text-white min-h-screen flex items-center">
            <div class="container mx-auto p-4 flex justify-center items-center">
                <div class="text-center md:text-left p-4">
                    <div class="text-6xl font-medium">404</div>
                    <div class="text-xl md:text-3xl font-medium mb-4">
                        Oops. This page has gone missing.
                    </div>
                    <div class="text-lg mb-8">
                        You may have mistyped the address or the page may have moved.
                    </div>
                    <Link to="/" class="border border-white rounded p-4">Go Home</Link>
                </div>
            </div>
        </div>
    )
}