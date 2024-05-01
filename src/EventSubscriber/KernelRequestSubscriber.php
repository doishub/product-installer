<?php

namespace Oveleon\ProductInstaller\EventSubscriber;

use Contao\CoreBundle\Routing\ScopeMatcher;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\RequestEvent;
use Symfony\Component\HttpKernel\KernelEvents;

class KernelRequestSubscriber implements EventSubscriberInterface
{
    protected $scopeMatcher;

    public function __construct(ScopeMatcher $scopeMatcher)
    {
        $this->scopeMatcher = $scopeMatcher;
    }

    public static function getSubscribedEvents()
    {
        return [KernelEvents::REQUEST => 'onKernelRequest'];
    }

    public function onKernelRequest(RequestEvent $e): void
    {
        $request = $e->getRequest();

        if ($this->scopeMatcher->isBackendRequest($request)) {
            #$GLOBALS['TL_CSS'][] = 'bundles/productinstaller/styles/backend.css|static';
            #$GLOBALS['TL_JAVASCRIPT'][] = 'bundles/productinstaller/build/main.js';

            $GLOBALS['TL_CSS'][] = 'bundles/productinstaller/app/style.css|static';
            //$GLOBALS['TL_JAVASCRIPT'][] = 'bundles/productinstaller/app/app.js';
        }
    }
}
