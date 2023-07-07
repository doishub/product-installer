<?php

namespace Oveleon\ProductInstaller\Import\Validator;

use Contao\Controller;
use Contao\NewsArchiveModel;
use Contao\NewsModel;
use Oveleon\ProductInstaller\Import\TableImport;

/**
 * Validator class for validating the news records during and after import.
 *
 * @author Daniele Sciannimanica <https://github.com/doishub>
 */
class NewsValidator implements ValidatorInterface
{
    static public function getTrigger(): string
    {
        return NewsModel::getTable();
    }

    static public function getModel(): string
    {
        return NewsModel::class;
    }

    /**
     * Handles the relationship with the parent element.
     */
    static function setNewsArchiveConnection(array &$row, TableImport $importer): ?array
    {
        $translator = Controller::getContainer()->get('translator');

        $newsArchiveStructure = $importer->getArchiveContentByFilename(NewsArchiveModel::getTable(), [
            'value' => $row['pid'],
            'field' => 'id'
        ]);

        return $importer->useParentConnectionLogic($row, NewsModel::getTable(), NewsArchiveModel::getTable(), [
            'label'       => $translator->trans('setup.prompt.news.archive.label', [], 'setup'),
            'description' => $translator->trans('setup.prompt.news.archive.description', [], 'setup'),
            'explanation' => [
                'type'        => 'TABLE',
                'description' => $translator->trans('setup.prompt.news.archive.explanation', [], 'setup'),
                'content'     => $newsArchiveStructure ?? []
            ]
        ]);
    }
}
